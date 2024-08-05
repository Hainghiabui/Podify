import axios from 'axios';

const API_BASE_URL = 'https://sh-dev.qcloud.asia/booking/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Cookie: 'session_id=c2585eec3b4bd938bf0f45772e38c9205b772fb8',
  },
});

export const fetchBuildings = async () => {
  const response = await api.get('/hk/get-building');
  if (response.data.statusCode === 200 && response.data.message === 'Success') {
    return response.data.metadata;
  } else {
    throw new Error('Error fetching data');
  }
};

export const fetchFloors = async (buildingCode: string) => {
  const response = await api.get(
    `/hk/get-floorcode-room-view?buildingCode=${buildingCode}`,
  );
  if (response.data.statusCode === 200 && response.data.message === 'Success') {
    return response.data.metadata;
  } else {
    throw new Error('Error fetching data');
  }
};
