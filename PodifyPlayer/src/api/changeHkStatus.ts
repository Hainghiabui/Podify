import axios from 'axios';

const API_BASE_URL = 'https://api-gateway-test.apecgroup.net/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Cookie:
      'session_id=session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8; session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8',
    HotelId: 26,
    Server: 'HK',
  },
});

export const changeHkStatus = async (params: string) => {
  const response = await api.post('/cm/pms/hk/get-change-hk-status', params);
  if (response.data.statusCode === 200 && response.data.message === 'Success') {
    return response.data.metadata;
  } else {
    throw new Error('Error fetching data');
  }
};
