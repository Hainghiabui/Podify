import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Floor {
  id: number;
  text: string;
  value: string;
}

interface FilterFloorsState {
  filterFloors: Floor[];
}

const initialState: FilterFloorsState = {
  filterFloors: [],
};

const filterFloorsSlice = createSlice({
  name: 'filterFloors',
  initialState,
  reducers: {
    setFilterFloor(state, action: PayloadAction<Floor[]>) {
      state.filterFloors = action.payload;
    },
  },
});

export const {setFilterFloor} = filterFloorsSlice.actions;
export default filterFloorsSlice.reducer;
