import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import AppButton from './AppButton';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useQuery} from 'react-query';
import {fetchFloors} from 'src/api/fetchBuildings';
import SelectButton from '@ui/SelectButton';
import {useDispatch} from 'react-redux';
import {setFilterFloor} from 'src/store/filterFloorSlice';

interface Props {
  visible: boolean;
  building: string;
  onClose: () => void;
}
interface Floor {
  id: number;
  text: string;
  value: string;
}

const FloorModalFilter: FC<Props> = ({visible, building, onClose}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterFloors, setFilterFloors] = useState<Floor[]>([]);
  const [listFilterFloor, setListFilterFloor] = useState<Floor[]>([]);
  const dispatch = useDispatch();
  const {data: floorsData} = useQuery(
    ['floors', building],
    () => fetchFloors(building),
    {
      enabled: !!building,
      onSuccess: data => {
        setFilterFloors(data);
      },
    },
  );

  const filteredFloors = filterFloors.filter(floor =>
    floor.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const extractNumber = (text: string) => text.replace(/^\D+/g, '');
  const handleSubmit = () => {
    dispatch(setFilterFloor(listFilterFloor));
    onClose();
  };

  const handleToggleSelect = (floor: Floor) => {
    const isSelected = listFilterFloor.some(
      selected => selected.id === floor.id,
    );
    const newSelectedFloors = isSelected
      ? listFilterFloor.filter(selected => selected.id !== floor.id)
      : [...listFilterFloor, floor];
    setListFilterFloor(newSelectedFloors);
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
            <Text style={styles.modalTitle}>Chọn tầng</Text>
          </View>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={colors.DARKEST} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={16} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm tầng"
            keyboardType="numeric"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={filteredFloors}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const title = `Tầng ${extractNumber(item.text)}`;
            const isSelected = listFilterFloor.some(
              floor => floor.id === item.id,
            );
            return (
              <SelectButton
                title={title}
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

export default FloorModalFilter;
