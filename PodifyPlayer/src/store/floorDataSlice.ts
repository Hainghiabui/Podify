import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Room} from 'src/@type/building';

interface FloorData {
  floor: string;
  data: Room[];
}

interface FloorDataState {
  floorData: FloorData[];
}

const initialState: FloorDataState = {
  floorData: [],
};

const floorDataSlice = createSlice({
  name: 'floorData',
  initialState,
  reducers: {
    setFloorData(state, action: PayloadAction<FloorData[]>) {
      state.floorData = action.payload;
    },
  },
});

export const {setFloorData} = floorDataSlice.actions;
export default floorDataSlice.reducer;
