import {configureStore} from '@reduxjs/toolkit';
import selectedFloorsReducer from './selectedFloorsSlice';
import floorDataReducer from './floorDataSlice';
import selectedBuildingRededucer from './selectedBuildingSlice';
import getFloorsReducer from './getFloorsSlice';
const store = configureStore({
  reducer: {
    selectedFloors: selectedFloorsReducer,
    floorData: floorDataReducer,
    selectedBuilding: selectedBuildingRededucer,
    getFloors: getFloorsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
