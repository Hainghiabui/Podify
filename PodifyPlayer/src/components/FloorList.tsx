import colors from '@utils/colors';
import React, {useEffect, useState} from 'react';
import {View, FlatList, Pressable, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {RootState} from 'src/store';
import RoomGrid from './RoomGrid';
import Card from './Card';
import axios from 'axios';

interface Room {
  floor: string;
  id: number;
  roomCode: string;
  roomTypeCode: string;
  blockBy: string | null;
  blockRemark: string | null;
  blockStatus: string | null;
  hkStatus: string;
  isBlocked: string;
  roomStatus: string;
  noofGuest: number | null;
  isBackToBack: number;
  guestStatus: string | null;
  roomTypeName: string;
}

interface Floor {
  floor: string;
  data: Room[];
}

interface Props {}

const FloorList: React.FC<Props> = () => {
  const [floors, setFloors] = useState<Floor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        'https://api-gateway-test.apecgroup.net/api/cm/pms/hk/get-room-view',
        {
          buildingCode: 'DIAMOND',
          floorCode: '',
          dateRoom: '',
          roomCode: '',
          roomTypeCode: '',
          blockStatus: '',
          hkStatus: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Cookie:
              'session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8; session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8',
            'X-Api-Key': '34c85b1f6df12f96c0034664c8b1f1f3',
            HotelId: 26,
            Server: 'HK',
          },
        },
      )
      .then(response => {
        if (
          response.data.statusCode === 200 &&
          response.data.message === 'Success'
        ) {
          setFloors(response.data.metadata);
        } else {
          console.error('Error fetching data');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
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

  const toggleRoomList = () => {};

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={sortedFloors}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => (
            <View>
              <View style={styles.floorItem}>
                <Text style={[styles.btnText, {fontWeight: 'bold'}]}>
                  Tầng {extractNumber(item)}
                </Text>
                <Pressable>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color={colors.DARKEST}
                    onPress={() => toggleRoomList()}
                  />
                </Pressable>
              </View>
              <RoomGrid />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: colors.PRIMARY,
  },
  floorItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.GRAYLIGHT,
  },
  btnText: {color: '#000', fontSize: 14},
  floorContainer: {},
});

export default FloorList;
