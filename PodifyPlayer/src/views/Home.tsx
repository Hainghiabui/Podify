import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {
  setSelectedFloors,
  clearSelectedFloors,
} from '../store/selectedFloorsSlice';
import {setFloors} from '../store/getFloorsSlice';
import NavHeader from '../components/NavHeader';
import BuildingModal from '../components/BuildingModal';
import FloorModal from '../components/FloorModal';
import FloorList from '../components/FloorList';
import colors from '@utils/colors';
import {fetchBuildings, fetchFloors} from 'src/api/fetchBuildings';
import {useQuery} from 'react-query';
import {fetchRoomView} from 'src/api/fetchRooms';
import {setFloorData} from 'src/store/floorDataSlice';
import {setLoading} from 'src/store/loading';

const Home: React.FC = () => {
  const [buildingModalVisible, setBuildingModalVisible] =
    useState<boolean>(false);
  const [floorModalVisible, setFloorModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: buildingsData,
    error: buildingsError,
    isLoading: buildingsLoading,
    refetch: refetchBuildings,
  } = useQuery('buildings', fetchBuildings);

  const selectedBuilding = useSelector(
    (state: RootState) => state.selectedBuilding.selectedBuilding,
  );
  const getFloors = useSelector(
    (state: RootState) => state.getFloors.getFloors,
  );
  const loading = useSelector((state: RootState) => state.loading.loading);

  const {
    data: floorsData,
    error: floorsError,
    isLoading: floorsLoading,
  } = useQuery(
    ['floors', selectedBuilding.value],
    () => fetchFloors(selectedBuilding.value),
    {
      enabled: !!selectedBuilding.value,
      onSuccess: data => {
        dispatch(setFloors(data));
      },
      onError: () => {},
    },
  );
  const selectFloors = (
    floors: {id: number; text: string; value: string}[],
  ) => {
    dispatch(
      setSelectedFloors(
        floors.map(floor => ({
          ...floor,
          text: extractNumber(floor.text),
        })),
      ),
    );
    setFloorModalVisible(false);
  };

  const selectedFloors = useSelector(
    (state: RootState) => state.selectedFloors.selectedFloors,
  );

  const roomViewParams = {
    buildingCode: selectedBuilding.value || '',
    floorCode: '',
    dateRoom: '',
    roomCode: '',
    roomTypeCode: '',
    blockStatus: '',
    hkStatus: '',
  };

  const {refetch: refetchFloors} = useQuery(
    ['roomView', JSON.stringify(roomViewParams)],
    () => fetchRoomView(JSON.stringify(roomViewParams)),
    {
      enabled: !!selectedBuilding.value,
      onSuccess: data => {},
      onError: () => {},
    },
  );

  const dispatch = useDispatch();

  const extractNumber = (text: string) => text.replace(/^\D+/g, '');

  const handleDeleteAll = () => {
    dispatch(clearSelectedFloors());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchFloors();
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setRefreshing(false);
  };
  useEffect(() => {
    if (loading) {
      setRefreshing(true);
      refetchFloors();
      dispatch(setLoading(false));
    }
    setRefreshing(false);
  }, [loading]);

  if (buildingsLoading || floorsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <NavHeader
              selectBuilding={() => {
                setBuildingModalVisible(true);
              }}
              selectFloor={() => setFloorModalVisible(true)}
              extractNumber={text => text.replace(/^\D+/g, '')}
              deleteAll={() => handleDeleteAll()}
            />
            <BuildingModal
              visible={buildingModalVisible}
              buildings={buildingsData}
              onClose={() => setBuildingModalVisible(false)}
            />
            <FloorModal
              visible={floorModalVisible}
              floors={getFloors}
              onClose={() => setFloorModalVisible(false)}
            />
          </>
        }
        ListFooterComponent={<FloorList />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.PRIMARY},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
