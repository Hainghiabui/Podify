import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Image} from 'react-native-elements';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AppButton from './AppButton';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: FC<Props> = ({visible, onClose}) => {
  return (
    <View style={styles.container}>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        swipeDirection="down"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
            <Text style={styles.modalTitle}>Bộ lọc</Text>
            <AntDesign
              name="close"
              size={20}
              color={colors.DARKEST}
              onPress={() => onClose()}
            />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Tòa nhà</Text>
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
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
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
    paddingVertical: 8,
  },

  line: {
    height: 12,
    borderBottomColor: colors.GRAYLIGHT,
    borderBottomWidth: 1,
    width: '100%',
  },
});

export default FilterModal;
