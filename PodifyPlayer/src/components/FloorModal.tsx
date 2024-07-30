// components/FloorModal.tsx
import React, {useState} from 'react';
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
import colors from '@utils/colors';
import SelectButton from '@ui/SelectButton';
import AppButton from './AppButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setSelectedFloors} from '../store/selectedFloorsSlice';

interface Floor {
  id: number;
  text: string;
  value: string;
}

interface Props {
  visible: boolean;
  floors: Floor[];
  onClose: () => void;
  onSelect: (selectedFloors: Floor[]) => void;
}

const FloorModal: React.FC<Props> = ({visible, floors, onClose}: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useDispatch();
  const selectedFloors = useSelector(
    (state: RootState) => state.selectedFloors.selectedFloors,
  );

  const handleToggleSelect = (floor: Floor) => {
    const isSelected = selectedFloors.some(
      selected => selected.id === floor.id,
    );
    const newSelectedFloors = isSelected
      ? selectedFloors.filter(selected => selected.id !== floor.id)
      : [...selectedFloors, floor];
    dispatch(setSelectedFloors(newSelectedFloors));
  };

  const handleSubmit = () => {
    onClose();
  };

  const filteredFloors = floors.filter(floor =>
    floor.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const extractNumber = (text: string) => text.replace(/^\D+/g, '');

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
          <Text style={styles.modalTitle}>Chọn tầng</Text>
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
            const isSelected = selectedFloors.some(
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

export default FloorModal;
