// screens/Home.tsx
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, ActivityIndicator} from 'react-native';
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
import axios from 'axios';
import colors from '@utils/colors';
import {setSelectedBuildingValue} from 'src/store/selectedBuildingSlice';

const Home: React.FC = () => {
  const [buildingModalVisible, setBuildingModalVisible] =
    useState<boolean>(false);
  const [floorModalVisible, setFloorModalVisible] = useState<boolean>(false);

  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const selectedFloors = useSelector(
    (state: RootState) => state.selectedFloors.selectedFloors,
  );

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

  const selectedBuilding = useSelector(
    (state: RootState) => state.selectedBuilding.selectedBuilding,
  );

  useEffect(() => {
    axios
      .get('https://sh-dev.qcloud.asia/booking/api/hk/get-building', {
        headers: {
          'Content-Type': 'application/json',
          Cookie: 'session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8',
        },
      })
      .then(response => {
        if (
          response.data.statusCode === 200 &&
          response.data.message === 'Success'
        ) {
          setBuildings(response.data.metadata);
        } else {
          console.error('Error fetching data');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedBuilding.value) return;
    axios
      .get(
        `https://sh-dev.qcloud.asia/booking/api/hk/get-floorcode-room-view?buildingCode=${selectedBuilding.value}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        if (
          response.data.statusCode === 200 &&
          response.data.message === 'Success'
        ) {
          dispatch(clearSelectedFloors());
          dispatch(setFloors(response.data.metadata));
        } else {
          console.error('Error fetching data');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [selectedBuilding.value, dispatch]);

  const handleDeleteAll = () => {
    dispatch(clearSelectedFloors());
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        buildings={buildings}
        onClose={() => setBuildingModalVisible(false)}
      />
      <FloorModal
        visible={floorModalVisible}
        floors={getFloors}
        onClose={() => setFloorModalVisible(false)}
        onSelect={selectFloors}
      />
      <FloorList />
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
