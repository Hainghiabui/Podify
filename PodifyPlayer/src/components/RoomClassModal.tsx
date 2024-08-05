import colors from '@utils/colors';
import {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {useQuery} from 'react-query';
import {fetchRoomType} from 'src/api/fetchRooms';
import AppButton from './AppButton';
import SelectButton from '@ui/SelectButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {setFilterRoomsClass} from 'src/store/filterRoomsClassSlice';

interface Props {
  visible: boolean;
  onClose: () => void;
}
const RoomClassModal: FC<Props> = ({visible, onClose}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roomClasses, setRoomClasses] = useState<string[]>([]);
  const [listRoomClasses, setListRoomClasses] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleToggleSelect = (roomClass: string) => {
    const isSelected = listRoomClasses.some(selected => selected === roomClass);
    const newSelectedRoomClasses = isSelected
      ? listRoomClasses.filter(selected => selected !== roomClass)
      : [...listRoomClasses, roomClass];
    setListRoomClasses(newSelectedRoomClasses);
  };
  const {data: roomClassesData} = useQuery(
    ['roomClasses'],
    () => fetchRoomType(),
    {
      enabled: true,
      onSuccess: data => {
        const roomClasses = data.map((item: {value: string}) => item.value);
        setRoomClasses(roomClasses);
      },
    },
  );
  const filteredRoomClasses = roomClasses.filter(roomClass =>
    roomClass.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleSubmit = () => {
    dispatch(setFilterRoomsClass(listRoomClasses));
    onClose();
  };
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
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.DARKEST}
              onPress={onClose}
            />
            <Text style={styles.modalTitle}>Chọn hạng phòng</Text>
          </View>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={colors.DARKEST} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={16} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm hạng phòng"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={searchQuery ? filteredRoomClasses : roomClasses}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => {
            const isSelected = listRoomClasses.some(floor => floor === item);
            return (
              <SelectButton
                title={item}
                onPress={() => handleToggleSelect(item)}
                isSelected={isSelected}
              />
            );
          }}
          contentContainerStyle={styles.floorsContainer}
          numColumns={3}
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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.DARKEST,
  },
  modalCloseButton: {
    padding: 10,
  },
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
  floorsContainer: {
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default RoomClassModal;
