import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useQuery} from 'react-query';
import colors from '@utils/colors';
import {fetchBuildings} from 'src/api/fetchBuildings';
import {fetchHkStatus} from 'src/api/fetchHkStatus';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/store';
import RoomModal from './RoomModal';
import RoomClassModal from './RoomClassModal';
import BlockStatusModal from './BlockStatusModal';
import FloorModalFilter from './FloorModalFilter';
import HkStatusButton from './HkStatusButton';
import {setFilterFloor} from 'src/store/filterFloorSlice';
import {setFilterRooms} from 'src/store/filterRoomsSlice';
import {setFilterRoomsClass} from 'src/store/filterRoomsClassSlice';
import {setFilterBlockStatus} from 'src/store/filterBlockStatus';
import {setFilterStatus} from 'src/store/filterStatus';
import {setFilter} from 'src/store/filterSlice';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: FC<FilterModalProps> = ({visible, onClose}) => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [listFloorsModalVisible, setListFloorsModalVisible] =
    useState<boolean>(false);
  const [isRoomModalVisible, setIsRoomModalVisible] = useState<boolean>(false);
  const [roomClassModalVisible, setRoomClassModalVisible] =
    useState<boolean>(false);
  const [blockStatusModalVisible, setBlockStatusModalVisible] =
    useState<boolean>(false);

  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);

  const filterFloorDataModal = useSelector(
    (state: RootState) => state.filterFloors.filterFloors,
  );

  const dispatch = useDispatch();
  const filterRooms = useSelector(
    (state: RootState) => state.filterRooms.filterRooms,
  );
  const filterRoomsClass = useSelector(
    (state: RootState) => state.filterRoomsClass.filterRoomsClass,
  );
  const filterBlockStatus = useSelector(
    (state: RootState) => state.filterBlockStatus.filterBlockStatus,
  );

  const handlePress = (value: string) => setSelectedBuilding(value);

  const {data: buildingsData, isLoading: buildingsLoading} = useQuery(
    'buildings',
    fetchBuildings,
  );
  const {data: hkStatusData} = useQuery('hkStatus', fetchHkStatus);

  if (buildingsLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const extractNumber = (text: string) => text.replace(/^\D+/g, '');

  const handleReset = () => {
    setSelectedBuilding('');
    dispatch(setFilterFloor([]));
    dispatch(setFilterRooms([]));
    dispatch(setFilterRoomsClass([]));
    dispatch(setFilterBlockStatus([]));
    dispatch(setFilter(false));
    setSelectedStatus([]);
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DIRTY':
        return colors.RED;
      case 'CLEAN':
        return colors.BLUE;
      case 'INSPECTED':
        return colors.GREEN;
      case 'PICK-UP':
        return colors.YELLOW;
      default:
        return colors.GRAY;
    }
  };

  const getStatusColorLight = (status: string) => {
    switch (status) {
      case 'DIRTY':
        return colors.REDLIGHT;
      case 'CLEAN':
        return colors.BLUELIGHT;
      case 'INSPECTED':
        return colors.GREENLIGHT;
      case 'PICK-UP':
        return colors.YELLOWLIGHT;
      default:
        return colors.GRAYLIGHT;
    }
  };
  const handleStatusButtonPress = (status: string, index: number) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter(item => item !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
    setIndex(index);
  };

  const handleSubmit = () => {
    dispatch(setFilterStatus(selectedStatus));
    dispatch(setFilter(true));
    onClose();
  };
  return (
    <View style={styles.container}>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        swipeDirection="down"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Bộ lọc</Text>
            <AntDesign
              name="close"
              size={20}
              color={colors.DARKEST}
              onPress={onClose}
            />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Tòa nhà</Text>
            <View style={styles.spacer} />
            <View style={styles.buttonContainer}>
              {buildingsData.map((item: {value: string}) => (
                <View
                  key={item.value}
                  style={[
                    styles.buttonOuter,
                    selectedBuilding === item.value &&
                      styles.buttonOuterSelected,
                  ]}>
                  <Pressable
                    style={[
                      styles.buttonInner,
                      {
                        backgroundColor:
                          selectedBuilding === item.value
                            ? colors.GREEN
                            : colors.GRAYLIGHT,
                      },
                    ]}
                    onPress={() => handlePress(item.value)}>
                    <Text
                      style={[
                        styles.buttonTitle,
                        {
                          color:
                            selectedBuilding === item.value
                              ? colors.WHITE
                              : colors.DARKEST,
                        },
                      ]}>
                      {item.value?.charAt(0)} - {item.value}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
            <View style={styles.spacerLarge} />
            <View style={styles.selectorContainer}>
              <View style={styles.selector}>
                <Text style={styles.sectionTitle}>Tầng</Text>
                <View style={styles.spacer} />
                <Pressable
                  style={styles.selectorBox}
                  onPress={() => setListFloorsModalVisible(true)}>
                  <Text style={styles.selectorText}>
                    {filterFloorDataModal
                      .map(floor => extractNumber(floor.text))
                      .join(', ')}
                  </Text>
                  <AntDesign name="down" size={14} color={colors.DARKEST} />
                </Pressable>
              </View>
              <View style={styles.selector}>
                <Text style={styles.sectionTitle}>Số phòng</Text>
                <View style={styles.spacer} />
                <Pressable
                  style={styles.selectorBox}
                  onPress={() => setIsRoomModalVisible(true)}>
                  <Text style={styles.selectorText}>
                    {filterRooms.map(item => item.roomCode).join(', ')}
                  </Text>
                  <AntDesign name="down" size={14} color={colors.DARKEST} />
                </Pressable>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={[styles.selectorContainer, {flexDirection: 'column'}]}>
              <Text style={styles.sectionTitle}>Hạng phòng</Text>
              <View style={styles.spacer} />
              <Pressable
                style={styles.selectorBox}
                onPress={() => setRoomClassModalVisible(true)}>
                <Text style={styles.selectorText}>
                  {filterRoomsClass.join(', ')}
                </Text>
                <AntDesign name="down" size={14} color={colors.DARKEST} />
              </Pressable>
            </View>
            <View style={styles.separator} />
            <View style={[styles.selectorContainer, {flexDirection: 'column'}]}>
              <Text style={styles.sectionTitle}>Loại khóa phòng</Text>
              <View style={styles.spacer} />
              <Pressable
                style={styles.selectorBox}
                onPress={() => setBlockStatusModalVisible(true)}>
                <Text style={styles.selectorText}>
                  {filterBlockStatus.join(', ')}
                </Text>
                <AntDesign name="down" size={14} color={colors.DARKEST} />
              </Pressable>
            </View>
            <View style={styles.separator} />
            <View style={[styles.selectorContainer, {flexDirection: 'column'}]}>
              <Text style={styles.sectionTitle}>Trạng thái dọn phòng</Text>
              <View style={styles.spacerLarge} />
              <View
                style={[
                  styles.buttonContainer,
                  {justifyContent: 'space-around'},
                ]}>
                {hkStatusData &&
                  hkStatusData.map((item: {text: string}, index: number) => (
                    <HkStatusButton
                      key={index}
                      color={
                        selectedStatus.includes(item.text)
                          ? getStatusColorLight(item.text)
                          : getStatusColor(item.text)
                      }
                      title={item.text}
                      lightColor={
                        selectedStatus.includes(item.text)
                          ? getStatusColor(item.text)
                          : getStatusColorLight(item.text)
                      }
                      onPress={() => handleStatusButtonPress(item.text, index)}
                      isSelected={selectedStatus.includes(item.text)}
                      textColor={
                        selectedStatus.includes(item.text)
                          ? colors.WHITE
                          : getStatusColor(item.text)
                      }
                    />
                  ))}
              </View>
            </View>
            <View style={styles.spacerLarge} />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => handleReset()}>
                <Text style={styles.resetText}>Thiết lập lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => handleSubmit()}>
                <Text style={styles.applyText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
            <FloorModalFilter
              visible={listFloorsModalVisible}
              building={selectedBuilding}
              onClose={() => setListFloorsModalVisible(false)}
            />
            <RoomModal
              visible={isRoomModalVisible}
              building={selectedBuilding}
              onClose={() => setIsRoomModalVisible(false)}
            />
            <RoomClassModal
              visible={roomClassModalVisible}
              onClose={() => setRoomClassModalVisible(false)}
            />
            <BlockStatusModal
              visible={blockStatusModalVisible}
              onClose={() => setBlockStatusModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.DARKEST,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.DARKEST,
  },
  spacer: {
    height: 8,
  },
  spacerLarge: {
    height: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonOuter: {
    width: '48%',
    padding: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonOuterSelected: {
    borderColor: colors.GREEN,
  },
  buttonInner: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonTitle: {
    fontWeight: '500',
    fontSize: 14,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selector: {
    width: '48%',
  },
  selectorBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.GRAYLIGHT,
  },
  selectorText: {
    fontWeight: '400',
    color: colors.DARKEST,
  },
  hkStatusButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.GRAYLIGHT,
  },
  hkStatusButtonSelected: {
    backgroundColor: colors.GREEN,
  },
  hkStatusText: {
    color: colors.DARKEST,
  },
  hkStatusTextSelected: {
    color: colors.WHITE,
  },
  separator: {
    borderWidth: 0.6,
    borderColor: colors.GRAYLIGHT,
    marginVertical: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
    width: '45%',
  },
  resetText: {
    color: 'green',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '45%',
  },
  applyText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default FilterModal;
