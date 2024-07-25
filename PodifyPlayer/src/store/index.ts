import {configureStore} from '@reduxjs/toolkit';
import selectedFloorsReducer from './selectedFloorsSlice';

const store = configureStore({
  reducer: {
    selectedFloors: selectedFloorsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
