import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import colors from '@utils/colors';
import AppButton from './AppButton';

interface Building {
  id: number;
  text: string;
  value: string;
}

interface Props {
  visible: boolean;
  buildings: Building[];
  onClose: () => void;
  onSelect: (building: Building) => void;
}

const BuildingModal: React.FC<Props> = ({
  visible,
  buildings,
  onClose,
  onSelect,
}) => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(
    null,
  );

  const handleSelectBuilding = (building: Building) => {
    setSelectedBuildingId(building.id);
    onSelect(building);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Chọn tòa nhà</Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={onClose}>
                  <AntDesign name="close" size={24} color={colors.DARKEST} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={buildings}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      {
                        backgroundColor:
                          item.id === selectedBuildingId
                            ? colors.GREENLIGHT
                            : 'transparent',
                      },
                    ]}
                    onPress={() => handleSelectBuilding(item)}>
                    <Text style={styles.itemText}>
                      {item.value?.charAt(0)} - {item.value}
                    </Text>
                    {item.id === selectedBuildingId && (
                      <Feather
                        name="check"
                        size={16}
                        color={colors.GREEN}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
              <AppButton title="Xác nhận" onPress={onClose} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    position: 'absolute',
    bottom: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {fontSize: 20, color: colors.DARKEST, fontWeight: 'bold'},
  modalCloseButton: {padding: 10},
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: colors.DARKEST,
    fontWeight: 'bold',
  },
  checkIcon: {
    marginLeft: 10,
  },
});

export default BuildingModal;
