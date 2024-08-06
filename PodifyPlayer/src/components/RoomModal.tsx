import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '@utils/colors';
import SelectButton from '@ui/SelectButton';
import AppButton from './AppButton';
import {Floor, Room} from 'src/@type/building';
import {useQuery} from 'react-query';
import {fetchRoomView} from 'src/api/fetchRooms';
import {useDispatch} from 'react-redux';
import {setFilterRooms} from 'src/store/filterRoomsSlice';

interface Props {
  visible: boolean;
  building: string;
  onClose: () => void;
  isFilter?: boolean;
}

const RoomModal: React.FC<Props> = ({visible, building, onClose}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roomList, setRoomList] = useState<Floor[]>([]);
  const [selectedRoomsList, setSelectedRoomsList] = useState<Room[]>([]);
  const dispatch = useDispatch();

  const roomViewParams = {
    buildingCode: building || '',
    floorCode: '',
    dateRoom: '',
    roomCode: '',
    roomTypeCode: '',
    blockStatus: '',
    hkStatus: '',
  };
  const {
    data: roomViewData,
    error: roomViewError,
    isLoading: roomViewLoading,
  } = useQuery(
    ['roomView', JSON.stringify(roomViewParams)],
    () => fetchRoomView(JSON.stringify(roomViewParams)),
    {
      enabled: !!building,
      onSuccess: data => {
        setRoomList(data);
      },
      onError: () => {},
    },
  );

  const handleToggleSelect = (rooms: Room) => {
    setSelectedRoomsList(prevState => {
      if (prevState.some(room => room.id === rooms.id)) {
        return prevState.filter(room => room.id !== rooms.id);
      } else {
        return [...prevState, rooms];
      }
    });
  };

  const handleSubmit = () => {
    dispatch(setFilterRooms(selectedRoomsList));
    onClose();
  };

  const extractNumber = (text: string) => text.replace(/^\D+/g, '');

  const filteredFloorData = roomList
    .map(floorItem => ({
      ...floorItem,
      data: floorItem.data.filter(room => room.roomCode.includes(searchQuery)),
    }))
    .filter(floorItem => floorItem.data.length > 0);

  return (
    <Modal
      isVisible={visible}
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropOpacity={1}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <View style={styles.headerContent}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.DARKEST}
              onPress={onClose}
            />
            <Text style={styles.modalTitle}>Chọn phòng</Text>
          </View>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={colors.DARKEST} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={16} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm số phòng"
            keyboardType="numeric"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={filteredFloorData}
          keyExtractor={item => item.floor.toString()}
          renderItem={({item}) => {
            const title = `Tầng ${extractNumber(item.floor)}`;
            return (
              <View>
                <View style={styles.floorHeader}>
                  <Text style={styles.floorTitle}>{title}</Text>
                  <AntDesign name="down" size={14} color={colors.DARKEST} />
                </View>
                <View style={styles.divider} />
                <FlatList
                  data={item.data}
                  keyExtractor={room => room.id.toString()}
                  renderItem={({item: room}) => (
                    <SelectButton
                      title={room.roomCode}
                      onPress={() => handleToggleSelect(room)}
                      isSelected={selectedRoomsList.some(
                        selected => selected.id === room.id,
                      )}
                    />
                  )}
                  contentContainerStyle={styles.floorsContainer}
                  numColumns={3}
                />
              </View>
            );
          }}
        />
        <View style={{height: 16}} />
        <AppButton title="Tiếp tục" onPress={handleSubmit} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.DARKEST,
  },
  modalCloseButton: {},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.GRAY,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  floorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  floorTitle: {
    color: colors.DARKEST,
    fontWeight: 'bold',
    fontSize: 14,
  },
  divider: {
    borderWidth: 0.8,
    borderColor: colors.GRAYLIGHT,
    marginVertical: 8,
  },
  floorsContainer: {
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default RoomModal;
