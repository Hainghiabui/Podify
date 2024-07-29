import React from 'react';
import {View, Text, Image, Pressable, StyleSheet, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '@utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/store';
import {deleteItem} from 'src/store/selectedFloorsSlice';
import NoteModal from './NoteModal';

const NavHeader = ({
  selectBuilding,
  selectFloor,
  extractNumber,
  deleteAll,
}: {
  deleteAll: () => void;

  selectBuilding: () => void;
  selectFloor: () => void;
  extractNumber: (text: string) => string;
}) => {
  const dispatch = useDispatch();
  const [noteModalVisible, setNoteModalVisible] = React.useState(false);

  const handleDeleteItem = (floor: string) => {
    dispatch(deleteItem(floor));
  };

  const selectedFloors = useSelector(
    (state: RootState) => state.selectedFloors.selectedFloors,
  );
  const listFloors = selectedFloors.map(floor => floor.text);

  const sortedFloors = listFloors
    .map(floorText => ({
      original: floorText,
      number: parseInt(extractNumber(floorText), 10),
    }))
    .sort((a, b) => a.number - b.number)
    .map(item => item.original);

  const selectedBuilding = useSelector(
    (state: RootState) => state.selectedBuilding.selectedBuilding,
  );

  return (
    <View style={styles.navHeader}>
      <View style={styles.navBar}>
        <View style={styles.logo}>
          <View style={styles.avatar}>
            <Image
              style={styles.avatar}
              source={require('../assets/avatar.png')}
            />
          </View>
          <View style={styles.content}>
            <Text>Xin chào,</Text>
            <Text
              style={{fontWeight: 'bold', fontSize: 18, color: colors.DARKEST}}>
              Josse Makima
            </Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color={colors.DARKEST}
          />
          <MaterialCommunityIcons
            name="checkbox-blank-badge-outline"
            size={24}
            color={colors.DARKEST}
            onPress={() => setNoteModalVisible(true)}
          />
          <View>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color={colors.DARKEST}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: -2,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </View>
        </View>
      </View>
      <View style={[styles.selectContainer, {justifyContent: 'space-between'}]}>
        <View style={styles.selectBuilding}>
          <MaterialCommunityIcons
            name="office-building-outline"
            size={16}
            color={colors.DARKEST}
          />
          <Text
            style={{fontWeight: 'bold', color: colors.DARKEST, fontSize: 14}}>
            {selectedBuilding.value.charAt(0)}
          </Text>
          <Pressable onPress={selectBuilding}>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={16}
              color={colors.DARKEST}
            />
          </Pressable>
        </View>
        <View style={styles.selectBuilding}>
          <SimpleLineIcons
            name="location-pin"
            size={16}
            color={colors.DARKEST}
          />
          <Text>Chọn</Text>
          <Pressable onPress={selectFloor}>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={16}
              color={colors.DARKEST}
            />
          </Pressable>
        </View>
        <View style={styles.line} />
        <View style={styles.btnContainer}>
          <Pressable style={styles.btnItem}>
            <Text style={styles.btnText}>Tất cả</Text>
          </Pressable>
          <Pressable style={styles.btnItem}>
            <Text style={styles.btnText}>Ưu tiên</Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.selectContainer, {gap: 8}]}>
        <AntDesign
          name="delete"
          size={16}
          color="#D8070B"
          onPress={() => deleteAll()}
        />
        <View style={styles.line} />
        <View style={styles.selectedItems}>
          <FlatList
            data={sortedFloors}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => (
              <View
                style={[
                  styles.btnItem,
                  {marginLeft: 12, flexDirection: 'row', gap: 4},
                ]}>
                <Text>Tầng {extractNumber(item)}</Text>
                <AntDesign
                  name="close"
                  size={12}
                  color={colors.DARKEST}
                  onPress={() => handleDeleteItem(item)}
                />
              </View>
            )}
            horizontal
          />
        </View>
      </View>
      <NoteModal
        visible={noteModalVisible}
        onClose={() => setNoteModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navHeader: {backgroundColor: '#FFFFFF'},
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  content: {},
  logo: {flexDirection: 'row', alignItems: 'center', padding: 10, gap: 12},
  iconContainer: {flexDirection: 'row', gap: 16},
  avatar: {width: 44, height: 44, borderRadius: 22},
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectBuilding: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: colors.GRAY,
  },
  selectLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
  },
  btnContainer: {flexDirection: 'row', gap: 8},
  btnText: {color: colors.DARKEST, fontSize: 14},
  btnItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
  },
  line: {
    width: 1,
    backgroundColor: '#CACACA',
    height: 24,
    alignItems: 'center',
  },
  selectedItems: {},
});

export default NavHeader;
