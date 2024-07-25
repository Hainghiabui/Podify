import React from 'react';
import {View, FlatList, Pressable, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {RootState} from 'src/store';

interface Floor {
  id: number;
  text: string;
  value: string;
}

interface Props {}

const FloorList: React.FC<Props> = () => {
  const extractNumber = (text: string) => {
    return text.replace(/^\D+/g, '');
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

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedFloors}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => (
          <View style={styles.floorItem}>
            <Text style={[styles.btnText, {fontWeight: 'bold'}]}>
              Tầng {extractNumber(item)}
            </Text>
            <Pressable>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={16}
                color="#000"
              />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 10, backgroundColor: '#FFFFFF'},
  floorItem: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnText: {color: '#000', fontSize: 14},
});

export default FloorList;
