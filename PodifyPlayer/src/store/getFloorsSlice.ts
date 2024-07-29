import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Floor {
  id: number;
  text: string;
  value: string;
}

interface FloorsState {
  getFloors: Floor[];
}

const initialState: FloorsState = {
  getFloors: [],
};

const getFloorsSlice = createSlice({
  name: 'getFloors',
  initialState,
  reducers: {
    setFloors(state, action: PayloadAction<Floor[]>) {
      state.getFloors = action.payload;
    },
  },
});

export const {setFloors} = getFloorsSlice.actions;
export default getFloorsSlice.reducer;
