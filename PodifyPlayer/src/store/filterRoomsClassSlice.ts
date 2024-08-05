import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Room} from 'src/@type/building';

interface FilterRoomsClassState {
  filterRoomsClass: string[];
}

const initialState: FilterRoomsClassState = {
  filterRoomsClass: [],
};

const filterRoomsClassSlice = createSlice({
  name: 'filterRoomsClass',
  initialState,
  reducers: {
    setFilterRoomsClass(state, action: PayloadAction<string[]>) {
      state.filterRoomsClass = action.payload;
    },
  },
});

export const {setFilterRoomsClass} = filterRoomsClassSlice.actions;
export default filterRoomsClassSlice.reducer;
