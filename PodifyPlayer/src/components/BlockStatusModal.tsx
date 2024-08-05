import React, {FC, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '@utils/colors';
import AppButton from './AppButton';
import SelectButton from '@ui/SelectButton';
import {fetchBlockStatus} from 'src/api/fetchBlockStatus';
import {setFilterBlockStatus} from 'src/store/filterBlockStatus';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const BlockStatusModal: FC<Props> = ({visible, onClose}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [blockStatus, setBlockStatus] = useState<string[]>([]);
  const [listBlockStatus, setListBlockStatus] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleToggleSelect = (roomClass: string) => {
    const isSelected = listBlockStatus.some(selected => selected === roomClass);
    const newSelectedBlockStatus = isSelected
      ? listBlockStatus.filter(selected => selected !== roomClass)
      : [...listBlockStatus, roomClass];
    setListBlockStatus(newSelectedBlockStatus);
  };

  const {data} = useQuery(['blockStatus'], fetchBlockStatus, {
    enabled: true,
    onSuccess: data => {
      const blockStatus = data.map((item: {value: string}) => item.value);
      setBlockStatus(blockStatus);
    },
  });

  const filteredBlockStatus = blockStatus.filter(blockStatus =>
    blockStatus.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = () => {
    dispatch(setFilterBlockStatus(listBlockStatus));
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
            <Text style={styles.modalTitle}>Chọn loại khóa phòng</Text>
          </View>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={colors.DARKEST} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={16} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm loại khóa phòng"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={searchQuery ? filteredBlockStatus : blockStatus}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => {
            const isSelected = listBlockStatus.some(floor => floor === item);
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

export default BlockStatusModal;
