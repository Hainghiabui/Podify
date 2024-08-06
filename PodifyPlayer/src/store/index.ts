import {configureStore} from '@reduxjs/toolkit';
import selectedFloorsReducer from './selectedFloorsSlice';
import floorDataReducer from './floorDataSlice';
import selectedBuildingRededucer from './selectedBuildingSlice';
import getFloorsReducer from './getFloorsSlice';
import filterFloorReducer from './filterFloorSlice';
import filterRoomReducer from './filterRoomsSlice';
import filterRoomClassReducer from './filterRoomsClassSlice';
import filterBlockStatusReducer from './filterBlockStatus';
import hkStatusReducer from './hkStatusSlice';
import filterStatus from './filterStatus';
import filter from './filterSlice';
import loading from './loading';

const store = configureStore({
  reducer: {
    selectedFloors: selectedFloorsReducer,
    floorData: floorDataReducer,
    selectedBuilding: selectedBuildingRededucer,
    getFloors: getFloorsReducer,
    filterFloors: filterFloorReducer,
    filterRooms: filterRoomReducer,
    filterRoomsClass: filterRoomClassReducer,
    filterBlockStatus: filterBlockStatusReducer,
    hkStatus: hkStatusReducer,
    filterStatus: filterStatus,
    filter: filter,
    loading: loading,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
