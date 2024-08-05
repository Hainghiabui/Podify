import axios from 'axios';

const API_BASE_URL = 'https://api-gateway-test.apecgroup.net/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Cookie:
      'session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8; session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8',
    'X-Api-Key': '34c85b1f6df12f96c0034664c8b1f1f3',
    HotelId: 26,
    Server: 'HK',
  },
});

export const fetchRoomView = async (params: string) => {
  const response = await api.post('/cm/pms/hk/get-room-view', params);
  if (response.data.statusCode === 200 && response.data.message === 'Success') {
    return response.data.metadata;
  } else {
    throw new Error('Error fetching data');
  }
};

export const fetchRoomType = async () => {
  const response = await api.get('/cm/pms/hk/get-list-room-type');
  if (response.data.statusCode === 200 && response.data.message === 'Success') {
    return response.data.metadata;
  } else {
    throw new Error('Error fetching data');
  }
};
