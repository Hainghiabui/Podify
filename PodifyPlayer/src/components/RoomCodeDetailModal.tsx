import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '@utils/colors';
import {useQuery} from 'react-query';
import {fetchHkStatus} from 'src/api/fetchHkStatus';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

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
  hkStatus: string;
  floor: string;
}

const RoomCodeDetailModal: React.FC<Props> = ({
  visible,
  floors,
  onClose,
  isFilter,
  roomCode,
  roomTypeCode,
  roomTypeName,
  hkStatus,
  floor,
}) => {
  const {data, error, isLoading} = useQuery('status', fetchHkStatus);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  const selectedBuilding = useSelector(
    (state: RootState) => state.selectedBuilding.selectedBuilding,
  );

  // Render loading or error states
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data</Text>;
  }

  const handleStatusButtonPress = (status: string) => {
    setSelectedStatus(status);
    setIsSelected(!isSelected);
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
          <View style={styles.headerContent}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.DARKEST}
              onPress={onClose}
            />
            <Text style={styles.modalTitle}>
              Chi tiết phòng: {roomCode}-{roomTypeCode}
            </Text>
          </View>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={colors.DARKEST} />
          </TouchableOpacity>
        </View>
        <View style={{height: 20}} />
        <View style={styles.modalHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <MaterialCommunityIcons
              name="office-building-outline"
              size={16}
              color={colors.DARKEST}
            />
            <Text style={{color: colors.DARKEST, fontSize: 16}}>Toà nhà</Text>
          </View>
          <Text style={{color: colors.DARKEST, fontWeight: 'bold'}}>
            Toà {selectedBuilding.value}
          </Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.modalHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <Octicons name="star" size={18} color={colors.DARKEST} />
            <Text style={{color: colors.DARKEST, fontSize: 16}}>
              Hạng phòng
            </Text>
          </View>
          <Text style={{color: colors.GREEN, fontWeight: 'bold'}}>
            {roomTypeName}
          </Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.modalHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <MaterialCommunityIcons
              name="bed-outline"
              size={18}
              color={colors.DARKEST}
            />
            <Text style={{color: colors.DARKEST, fontSize: 16}}>Tầng</Text>
          </View>
          <Text style={{fontWeight: 'bold'}}>Tầng {extractNumber(floor)}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.modalHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <Text style={{color: colors.DARKEST, fontSize: 16}}>
              Trạng thái dọn phòng
            </Text>
          </View>
          <View
            style={{
              backgroundColor: getStatusColor(hkStatus),
              paddingVertical: 4,
              paddingHorizontal: 12,
              borderRadius: 100,
              alignItems: 'center',
            }}>
            <Text
              style={{color: colors.WHITE, fontSize: 16, fontWeight: '500'}}>
              {hkStatus}
            </Text>
          </View>
        </View>
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

export default RoomCodeDetailModal;
