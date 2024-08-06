import React, {useState} from 'react';
import {View, FlatList, Pressable, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/store';
import Card from './Card';
import {setFloorData} from 'src/store/floorDataSlice';
import {clearSelectedFloors} from 'src/store/selectedFloorsSlice';
import colors from '@utils/colors';
import {fetchRoomView} from 'src/api/fetchRooms';
import {useQuery} from 'react-query';
import RoomDetailModal from './RoomDetailModal';
import {changeHkStatus} from 'src/api/changeHkStatus';
import {fetchHkStatusChange} from 'src/api/fetchHkStatusChange';
import {setHkStatus} from 'src/store/hkStatusSlice';
import {setLoading} from 'src/store/loading';

const FloorList: React.FC = () => {
  const [expandedFloors, setExpandedFloors] = useState<Record<string, boolean>>(
    {},
  );
  const [roomDetailVisible, setRoomDetailVisible] = useState(false);
  const [roomDetails, setRoomDetails] = useState({
    roomCode: '',
    roomId: 0,
    roomTypeCode: '',
    roomTypeName: '',
    hkStatusData: '',
    floor: '',
  });

  const floorData = useSelector(
    (state: RootState) => state.floorData.floorData || [],
  );
  const selectedBuilding = useSelector(
    (state: RootState) => state.selectedBuilding.selectedBuilding || {},
  );
  const filterFloor = useSelector(
    (state: RootState) => state.filterFloors.filterFloors || [],
  );
  const filterRoom = useSelector(
    (state: RootState) => state.filterRooms.filterRooms || [],
  );
  const filterRoomClass = useSelector(
    (state: RootState) => state.filterRoomsClass.filterRoomsClass || [],
  );
  const filterBlockStatus = useSelector(
    (state: RootState) => state.filterBlockStatus.filterBlockStatus || [],
  );
  const filterStatus = useSelector(
    (state: RootState) => state.filterStatus.filterStatus || [],
  );
  const hkStatus = useSelector(
    (state: RootState) => state.hkStatus.hkStatus || {},
  );
  const isFilter = useSelector(
    (state: RootState) => state.filter.filter || false,
  );

  const dispatch = useDispatch();

  const roomViewParams = {
    buildingCode: selectedBuilding.value || '',
    floorCode: '',
    dateRoom: '',
    roomCode: '',
    roomTypeCode: '',
    blockStatus: '',
    hkStatus: '',
  };

  useQuery(
    ['roomView', JSON.stringify(roomViewParams)],
    () => fetchRoomView(JSON.stringify(roomViewParams)),
    {
      enabled: !!selectedBuilding.value,
      onSuccess: data => {
        dispatch(setFloorData(data));
      },
      onError: () => {},
    },
  );

  const dateNow = new Date().toLocaleDateString('en-US');

  const hkStatusChangeParams = {
    id: roomDetails.roomId,
    roomCode: roomDetails.roomCode,
    roomDate: dateNow,
    hkStatus: hkStatus,
    userName: 'admin',
  };

  useQuery(
    ['hkStatusChange', JSON.stringify(hkStatusChangeParams)],
    () => fetchHkStatusChange(JSON.stringify(hkStatusChangeParams)),
    {
      enabled: !!hkStatus,
      onSuccess: data => {
        dispatch(setLoading(true));
        
      },
      onError: () => {},
    },
  );

  const extractNumber = (text: string) => text.replace(/^\D+/g, '');

  const selectedFloors = useSelector(
    (state: RootState) => state.selectedFloors.selectedFloors || [],
  );
  const listFloors = selectedFloors.map(floor => floor.text || '');

  const filterListFloors = filterFloor.map(floor => floor.text || '');
  const filterListRooms = filterRoom.map(
    room => room.roomCode?.toString() || '',
  );
  const filterListRoomClasses = filterRoomClass.map(
    roomClass => roomClass || '',
  );
  const filterListBlockStatus = filterBlockStatus.map(
    blockStatus => blockStatus || '',
  );
  const filterListStatus = filterStatus.map(status => status || '');

  const listRooms = floorData
    .map(floor => (floor.data ? floor.data.map(room => room.roomCode) : []))
    .flat();

  const getConvertedHKStatus = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return 'C';
      case 'INSPECTED':
        return 'I';
      case 'DIRTY':
        return 'D';
      case 'PICK-UP':
        return 'PU';
      default:
        return '';
    }
  };

  const filteredData = isFilter
    ? floorData
        .filter(
          floorData =>
            floorData.data &&
            floorData.data.some(
              room =>
                (filterListRooms.length
                  ? filterListRooms.includes(room.roomCode)
                  : listRooms.includes(room.roomCode)) &&
                (filterListRoomClasses.length
                  ? filterListRoomClasses.includes(room.roomTypeCode)
                  : true) &&
                (filterListBlockStatus.length
                  ? filterListBlockStatus.includes(room.blockStatus ?? '')
                  : true) &&
                (filterListStatus.length
                  ? filterListStatus
                      .map(getConvertedHKStatus)
                      .includes(room.hkStatus as '' | 'C' | 'I' | 'D' | 'PU')
                  : true),
            ) &&
            (filterListFloors.length
              ? filterListFloors.includes(floorData.floor)
              : true),
        )
        .map(floorData => ({
          ...floorData,
          data: floorData.data.filter(
            room =>
              (filterListRooms.length
                ? filterListRooms.includes(room.roomCode)
                : listRooms.includes(room.roomCode)) &&
              (filterListRoomClasses.length
                ? filterListRoomClasses.includes(room.roomTypeCode)
                : true) &&
              (filterListBlockStatus.length
                ? filterListBlockStatus.includes(room.blockStatus ?? '')
                : true) &&
              (filterListStatus.length
                ? filterListStatus
                    .map(getConvertedHKStatus)
                    .includes(room.hkStatus as '' | 'C' | 'I' | 'D' | 'PU')
                : true),
          ),
        }))
    : floorData.filter(floorData => listFloors.includes(floorData.floor));

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
        return 'CLEAN';
      case 'I':
        return 'INSPECTED';
      case 'D':
        return 'DIRTY';
      case 'PU':
        return 'PICK-UP';
      default:
        return '';
    }
  };

  const toggleRoomList = (floor: string) => {
    setExpandedFloors(prevState => ({
      ...prevState,
      [floor]: !prevState[floor],
    }));
  };

  const handleDetail = (
    roomCode: string,
    roomTypeCode: string,
    roomTypeName: string,
    hkStatus: string,
    floor: string,
    roomId: string,
  ) => {
    setRoomDetails({
      roomCode,
      roomTypeCode,
      roomTypeName,
      hkStatusData: hkStatus,
      floor,
      roomId: Number(roomId),
    });
    setRoomDetailVisible(true);
  };

  const onClose = () => {
    setRoomDetailVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.floor.toString()}
        renderItem={({item}) => (
          <View>
            <View style={styles.floorItem}>
              <Text style={[styles.btnText, {fontWeight: 'bold'}]}>
                Tầng {extractNumber(item.floor)}
              </Text>
              <Pressable onPress={() => toggleRoomList(item.floor)}>
                <MaterialIcons
                  name={
                    expandedFloors[item.floor]
                      ? 'keyboard-arrow-up'
                      : 'keyboard-arrow-down'
                  }
                  size={20}
                  color={colors.DARKEST}
                />
              </Pressable>
            </View>
            {expandedFloors[item.floor] && (
              <View style={styles.roomGrid}>
                {item.data &&
                  item.data.map((room, index) => (
                    <Card
                      key={room.roomCode}
                      roomCode={room.roomCode}
                      roomTypeCode={room.roomTypeCode}
                      noofGuest={room.noofGuest}
                      hkStatus={getHKStatus(room.hkStatus)}
                      statusColor={getStatusColor(room.roomStatus)}
                      roomId={room.id}
                      onPress={() =>
                        handleDetail(
                          room.roomCode,
                          room.roomTypeCode,
                          room.roomTypeName,
                          getHKStatus(room.hkStatus),
                          item.floor,
                          room.id.toString(),
                        )
                      }
                    />
                  ))}
              </View>
            )}
          </View>
        )}
      />
      <RoomDetailModal
        visible={roomDetailVisible}
        floors={[]}
        onClose={onClose}
        roomCode={roomDetails.roomCode}
        roomTypeCode={roomDetails.roomTypeCode}
        roomTypeName={roomDetails.roomTypeName}
        floor={roomDetails.floor}
        hkStatusData={roomDetails.hkStatusData}
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
  roomGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});

export default FloorList;
