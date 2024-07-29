import colors from '@utils/colors';
import React, {useEffect, useState} from 'react';
import {View, FlatList, Pressable, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/store';

import Card from './Card';
import axios from 'axios';
import {FloorData, RoomData} from 'src/@type/building';
import {setFloorData} from 'src/store/floorDataSlice';
import {clearSelectedFloors, deleteItem} from 'src/store/selectedFloorsSlice';

interface Room {
  floor: string;
  id: number;
  roomCode: string;
  roomTypeCode: string;
  blockBy: string | null;
  blockRemark: string | null;
  blockStatus: string | null;
  hkStatus: string;
  isBlocked: string;
  roomStatus: string;
  noofGuest: number | null;
  isBackToBack: number;
  guestStatus: string | null;
  roomTypeName: string;
}

interface Floor {
  name: string;
  roomsOfFloor: number;
}
type GroupedData = {
  [floor: string]: string[];
};
interface Props {}

const FloorList: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const floorData = useSelector(
    (state: RootState) => state.floorData.floorData,
  );
  const selectedBuilding = useSelector(
    (state: RootState) => state.selectedBuilding.selectedBuilding,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(
        'https://api-gateway-test.apecgroup.net/api/cm/pms/hk/get-room-view',
        {
          buildingCode: `${selectedBuilding.value}`,
          floorCode: '',
          dateRoom: '',
          roomCode: '',
          roomTypeCode: '',
          blockStatus: '',
          hkStatus: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Cookie:
              'session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8; session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8',
            'X-Api-Key': '34c85b1f6df12f96c0034664c8b1f1f3',
            HotelId: 26,
            Server: 'HK',
          },
        },
      )
      .then(response => {
        if (
          response.data.statusCode === 200 &&
          response.data.message === 'Success'
        ) {
          dispatch(clearSelectedFloors());
          dispatch(setFloorData(response.data.metadata));
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

  const extractNumber = (text: string) => {
    return text.replace(/^\D+/g, '');
  };

  const selectedFloors = useSelector(
    (state: RootState) => state.selectedFloors.selectedFloors,
  );

  const listFloors = selectedFloors.map(floor => floor.text);

  const filteredData = floorData.filter(floorData =>
    listFloors.includes(floorData.floor),
  );

  const sortedFloors = listFloors
    .map(floorText => ({
      original: floorText,
      number: parseInt(extractNumber(floorText), 10),
    }))
    .sort((a, b) => a.number - b.number)
    .map(item => item.original);

  const roomsOfFloor = filteredData.map(filteredData => ({
    floor: filteredData.floor,
    size: filteredData.data.length,
  }));

  const getSizeByFloor = (floor: string): number | undefined => {
    const floorData = roomsOfFloor.find(f => f.floor === floor);
    return floorData?.size;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VC':
        return colors.BLUE;
      case 'OP':
        return colors.YELLOW;
      case 'RS':
        return colors.GREEN;
      default:
        return colors.GRAY;
    }
  };

  const getHKStatus = (status: string) => {
    switch (status) {
      case 'C':
        return 'clean';
      case 'I':
        return 'inspected';
      case 'D':
        return 'dirty';
      case 'PU':
        return 'pickup';
      default:
        return '';
    }
  };

  const toggleRoomList = () => {};

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.floor.toString()}
        renderItem={({item}) => {
          const roomCodes = item.data.map(room => room.roomCode);
          const roomTypeCodes = item.data.map(room => room.roomTypeCode);
          const roomStatus = item.data.map(room => room.roomStatus);
          const noofGuest = item.data.map(room => room.noofGuest);
          const hkStatus = item.data.map(room => room.hkStatus);

          return (
            <View>
              <View style={styles.floorItem}>
                <Text style={[styles.btnText, {fontWeight: 'bold'}]}>
                  Tầng {extractNumber(item.floor)}
                </Text>
                <Pressable>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color={colors.DARKEST}
                    onPress={() => toggleRoomList()}
                  />
                </Pressable>
              </View>
              <View style={styles.roomGrid}>
                {roomCodes.length > 0 &&
                  roomCodes.map((roomCode, index) => (
                    <Card
                      key={index}
                      roomCode={roomCode}
                      roomTypeCode={roomTypeCodes[index]}
                      noofGuest={noofGuest[index]}
                      hkStatus={getHKStatus(hkStatus[index])}
                      statusColor={getStatusColor(roomStatus[index])}
                    />
                  ))}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: colors.PRIMARY,
  },
  floorItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.GRAYLIGHT,
  },
  btnText: {color: '#000', fontSize: 14},
  floorContainer: {},
  roomGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});

export default FloorList;
