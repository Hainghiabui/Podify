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

interface Props {
  visible: boolean;
  onClose: () => void;
}

const NoteModal: FC<Props> = ({visible, onClose}) => {
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
            <Text style={styles.modalTitle}>Chú thích</Text>
            <AntDesign
              name="close"
              size={20}
              color={colors.DARKEST}
              onPress={() => onClose()}
            />
          </View>
          <ScrollView>
            <Text style={styles.sectionTitle}>
              1. Trạng thái dọn phòng của HK
            </Text>
            <View style={styles.itemContainer}>
              <View style={{flexDirection: 'row', width: '50%'}}>
                <Image
                  source={require('../assets/clean.png')}
                  style={{width: 20, height: 20, marginRight: 8}}
                />
                <Text style={styles.itemText}>Clean</Text>
              </View>
              <View style={{flexDirection: 'row', width: '50%'}}>
                <Image
                  source={require('../assets/inspected.png')}
                  style={{width: 20, height: 20, marginRight: 8}}
                />
                <Text style={styles.itemText}>Inspected</Text>
              </View>
            </View>
            <View style={{height: 8}}></View>
            <View style={styles.itemContainer}>
              <View style={{flexDirection: 'row', width: '50%'}}>
                <Image
                  source={require('../assets/pickup.png')}
                  style={{width: 20, height: 20, marginRight: 8}}
                />
                <Text style={styles.itemText}>Pickup</Text>
              </View>
              <View style={{flexDirection: 'row', width: '50%'}}>
                <Image
                  source={require('../assets/dirty.png')}
                  style={{width: 20, height: 20, marginRight: 8}}
                />
                <Text style={styles.itemText}>Dirty</Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.sectionTitle}>2. Trạng thái phòng</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <FontAwesome name="circle" size={12} color={colors.GREEN} />
                <Text style={styles.itemText}>Đặt phòng</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <FontAwesome name="circle" size={12} color={colors.BLUE} />
                <Text style={styles.itemText}>Phòng trống</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <FontAwesome name="circle" size={12} color={colors.YELLOW} />
                <Text style={styles.itemText}>Có người</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>
              3. Trạng thái của phòng theo khách
            </Text>
            <View style={styles.itemContainer}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/check.png')}
                    style={{width: 24, height: 24, marginRight: 8}}
                  />
                  <Text style={styles.itemText}>
                    Có khách check out & check in
                  </Text>
                </View>
                <View style={{height: 8}}></View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/checkin.png')}
                    style={{width: 24, height: 24, marginRight: 8}}
                  />
                  <Text style={styles.itemText}>Có khách check in</Text>
                </View>
                <View style={{height: 8}}></View>

                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/checkout.png')}
                    style={{width: 24, height: 24, marginRight: 8}}
                  />
                  <Text style={styles.itemText}>Có khách check out</Text>
                </View>
              </View>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.sectionTitle}>4. Trạng thái khóa</Text>
            <View style={styles.itemContainer}>
              <Fontisto name="locked" size={20} color={colors.GRAY} />
              <View style={{width: 8}}></View>
              <Text style={styles.itemText}>Khóa phòng</Text>
            </View>
            <Text style={styles.sectionTitle}>5. Trạng thái chờ check out</Text>
            <View style={styles.itemContainer}>
              <Image
                source={require('../assets/flag.png')}
                style={{width: 20, height: 20}}
              />
              <View style={{width: 8}}></View>
              <Text style={styles.itemText}>Phòng chờ check out</Text>
            </View>
          </ScrollView>
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
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  itemText: {
    fontSize: 14,
    marginVertical: 2,
    color: colors.DARKEST,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  line: {
    height: 12,
    borderBottomColor: colors.GRAYLIGHT,
    borderBottomWidth: 1,
    width: '100%',
  },
});

export default NoteModal;
