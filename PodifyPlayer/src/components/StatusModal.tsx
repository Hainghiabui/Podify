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
import {useDispatch, useSelector} from 'react-redux';
import {setHkStatus} from 'src/store/hkStatusSlice';
import {RootState} from 'src/store';

interface Floor {
  id: number;
  text: string;
  value: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  isFilter?: boolean;
  hkStatusData: string;
  hkStatusChange: string;
  index: number;
}

const StatusModal: React.FC<Props> = ({
  visible,
  onClose,
  hkStatusData,
  index,
  hkStatusChange,
}) => {
  const {data, error, isLoading} = useQuery('status', fetchHkStatus);

  const dispatch = useDispatch();
  const hkStatus = useSelector((state: RootState) => state.hkStatus.hkStatus);

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

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  const getHkStatus = (status: string) => {
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

  const convertHkStatus = (status: string) => {
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
  const handleReset = () => {
    onClose();
  };
  const handleSubmit = () => {
    dispatch(setHkStatus(getHkStatus(hkStatusChange)));
    onClose();
  };
  // useEffect(() => {
  //   handleSubmit();
  // }, [hkStatus]);
  return (
    <Modal
      isVisible={visible}
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropOpacity={1}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View
          style={{
            paddingTop: 16,
            paddingBottom: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: colors.DARKEST}}>
            Đổi trạng thái
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.DARKEST,
              fontSize: 16,
              lineHeight: 25,
            }}>
            Bạn có chắc chắn muốn đổi từ trạng thái "
            <Text
              style={{
                color: getStatusColor(convertHkStatus(hkStatus)),
                fontWeight: '600',
              }}>
              {convertHkStatus(hkStatus)}
            </Text>
            " sang "
            <Text
              style={{
                color: getStatusColor(hkStatusChange),
                fontWeight: '600',
              }}>
              {hkStatusChange}
            </Text>
            " không?
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => handleReset()}>
            <Text style={styles.resetText}>Hủy bỏ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => handleSubmit()}>
            <Text style={styles.applyText}>Tôi chắc chắn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '95%',
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
    width: '48%',
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
    width: '48%',
  },
  applyText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default StatusModal;
