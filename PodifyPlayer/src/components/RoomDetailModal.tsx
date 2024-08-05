import React, {Key, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import colors from '@utils/colors';
import {useQuery} from 'react-query';
import {fetchHkStatus} from 'src/api/fetchHkStatus';
import HkStatusButton from './HkStatusButton';
import RoomCodeDetailModal from './RoomCodeDetailModal';
import {HkStatus} from 'src/@type/building';
import StatusModal from './StatusModal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/store';
import {setHkStatus} from 'src/store/hkStatusSlice';

interface Floor {
  id: number;
  text: string;
  value: string;
}

interface Props {
  visible: boolean;
  floors: Floor[];
  onClose: () => void;
  isFilter?: boolean;
  roomCode: string;
  roomTypeCode: string;
  roomTypeName: string;
  floor: string;
  hkStatusData: string;
}

const RoomDetailModal: React.FC<Props> = ({
  visible,
  floors,
  onClose,
  roomCode,
  roomTypeCode,
  roomTypeName,
  hkStatusData,
  floor,
}) => {
  const hkStatus = useSelector((state: RootState) => state.hkStatus.hkStatus);
  const {data, error, isLoading} = useQuery('status', fetchHkStatus);
  const [selectedStatus, setSelectedStatus] = useState(hkStatusData);
  const [index, setIndex] = useState<number>(0);
  const [roomCodeVisible, setRoomCodeVisible] = useState<boolean>(false);
  const [statusVisible, setStatusVisible] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleStatusButtonPress = (status: string, index: number) => {
    setStatusVisible(true);
    setSelectedStatus(status);
    setIndex(index);
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

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  const getHkStatus = (status: string) => {
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
            <Text style={styles.modalTitle}>
              Phòng: {roomCode}-{roomTypeCode}
            </Text>
          </View>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={colors.DARKEST} />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 10}}>
          <Text>Chọn một trong các chức năng dưới đây</Text>
        </View>
        <View style={{height: 20}} />
        <View style={styles.modalHeader}>
          <Text style={styles.floorTitle}>XEM CHI TIẾT</Text>
          <Feather
            name="arrow-up-right"
            size={24}
            color={colors.GREEN}
            onPress={() => setRoomCodeVisible(true)}
          />
        </View>
        <View style={styles.divider}></View>
        <View style={styles.modalHeader}>
          <Text style={styles.floorTitle}>XÁC NHẬN CHECK OUT</Text>
          <Feather name="arrow-up-right" size={24} color={colors.GREEN} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.floorTitle}>THAY ĐỔI TRẠNG THÁI DỌN PHÒNG</Text>
        <View style={styles.hkStatusContainer}>
          {data?.map((status: HkStatus, index: number) => (
            <HkStatusButton
              key={index}
              color={
                hkStatusData === status.text
                  ? getStatusColorLight(status.text)
                  : getStatusColor(status.text)
              }
              title={status.text}
              lightColor={
                hkStatusData === status.text
                  ? getStatusColor(status.text)
                  : getStatusColorLight(status.text)
              }
              onPress={() => handleStatusButtonPress(status.text, index)}
              isSelected={hkStatusData === status.text}
              textColor={
                hkStatusData === status.text
                  ? colors.WHITE
                  : getStatusColor(status.text)
              }
            />
          ))}
        </View>
        <View style={styles.divider}></View>
        <RoomCodeDetailModal
          visible={roomCodeVisible}
          floors={[]}
          onClose={() => setRoomCodeVisible(false)}
          roomCode={roomCode}
          roomTypeCode={roomTypeCode}
          roomTypeName={roomTypeName}
          hkStatus={hkStatusData}
          floor={floor}
        />
        <StatusModal
          visible={statusVisible}
          onClose={() => setStatusVisible(false)}
          hkStatusData={hkStatusData}
          hkStatusChange={selectedStatus}
          index={index}
        />
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
    marginVertical: 20,
  },
  floorsContainer: {
    justifyContent: 'space-around',
    marginTop: 10,
  },
  hkStatusContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 8,
  },
});

export default RoomDetailModal;
