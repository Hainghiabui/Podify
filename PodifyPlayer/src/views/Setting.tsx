import React, {FC, useEffect, useState} from 'react';
import axios from 'axios';
import {Text} from 'react-native-elements';

interface Props {}

const Setting: FC<Props> = props => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://api-gateway-test.apecgroup.net/api/cm/pms/hk/get-list-room?buildingCode=DIAMOND&floorCode=',
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
        } else {
          console.error('Error fetching data:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Request failed:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <Text>Data loaded</Text>;
};

export default Setting;
