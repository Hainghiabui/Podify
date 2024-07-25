import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'react-native-elements';

const ListOrder = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectFloor = (floor: number) => {
    setSelectedFloor(floor);
    // toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.openButton}>
        <Text style={styles.buttonText}>Chọn tầng</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Chọn tầng</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput style={styles.searchInput} placeholder="Tìm kiếm tầng" />

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {Array.from({length: 18}, (_, i) => (
              <Pressable
                key={i}
                style={[
                  styles.floorButton,
                  selectedFloor === i + 1 && styles.selectedFloorButton,
                ]}
                onPress={() => selectFloor(i + 1)}>
                <Text style={styles.floorText}>Tầng {i + 1}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <Button
            title="Tiếp tục"
            onPress={toggleModal}
            buttonStyle={styles.continueButton}
          />
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
  openButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 18,
    color: 'red',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  floorButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: '30%',
    alignItems: 'center',
  },
  selectedFloorButton: {
    backgroundColor: '#4CAF50',
  },
  floorText: {
    color: 'white',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    marginTop: 10,
  },
});

export default ListOrder;
