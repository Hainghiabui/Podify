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

  const {
    data: floorsData,
    error: floorsError,
    isLoading: floorsLoading,
    refetch: refetchFloors,
  } = useQuery(
    ['floors', selectedBuilding.value],
    () => fetchFloors(selectedBuilding.value),
    {
      enabled: !!selectedBuilding.value,
      onSuccess: data => {
        dispatch(clearSelectedFloors());
        dispatch(setFloors(data));
      },
      onError: () => {
        console.error('Error fetching data');
      },
    },
  );

  const dispatch = useDispatch();

  const getFloors = useSelector(
    (state: RootState) => state.getFloors.getFloors,
  );

  const extractNumber = (text: string) => text.replace(/^\D+/g, '');

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

  const handleDeleteAll = () => {
    dispatch(clearSelectedFloors());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchBuildings();
      await refetchFloors();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setRefreshing(false);
  };

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
