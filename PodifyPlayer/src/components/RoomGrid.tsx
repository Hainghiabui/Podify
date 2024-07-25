import colors from '@utils/colors';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
const RoomGrid: React.FC = () => {
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

  return (
    <View style={styles.roomGrid}>
      <Card
        icons={[
          {name: 'star', color: 'blue'},
          {name: 'star', color: 'orange'},
        ]}
      />
      <Card
        icons={[
          {name: 'star', color: 'blue'},
          {name: 'star', color: 'orange'},
        ]}
      />
      <Card
        icons={[
          {name: 'star', color: 'blue'},
          {name: 'star', color: 'orange'},
        ]}
      />
      <Card
        icons={[
          {name: 'star', color: 'blue'},
          {name: 'star', color: 'orange'},
        ]}
      />
      <Card
        icons={[
          {name: 'star', color: 'blue'},
          {name: 'star', color: 'orange'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  roomGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});

export default RoomGrid;
