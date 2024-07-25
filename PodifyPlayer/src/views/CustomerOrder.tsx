import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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

const CustomerOrder = () => {
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
    <ScrollView>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        floors.map(floor => (
          <View key={floor.floor} style={styles.floorContainer}>
            <Text style={styles.floorTitle}>Floor: {floor.floor}</Text>
            {floor.data.map(room => (
              <View key={room.id} style={styles.roomContainer}>
                <Text>ID: {room.id}</Text>
                <Text>Room Code: {room.roomCode}</Text>
                {/* <Text>Room Type Code: {room.roomTypeCode}</Text>
                <Text>Block By: {room.blockBy}</Text>
                <Text>Block Remark: {room.blockRemark}</Text>
                <Text>Block Status: {room.blockStatus}</Text>
                <Text>HK Status: {room.hkStatus}</Text>
                <Text>Is Blocked: {room.isBlocked}</Text>
                <Text>Room Status: {room.roomStatus}</Text>
                <Text>Number of Guests: {room.noofGuest}</Text>
                <Text>Is Back to Back: {room.isBackToBack}</Text>
                <Text>Guest Status: {room.guestStatus}</Text>
                <Text>Room Type Name: {room.roomTypeName}</Text> */}
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  floorContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  floorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roomContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default CustomerOrder;
