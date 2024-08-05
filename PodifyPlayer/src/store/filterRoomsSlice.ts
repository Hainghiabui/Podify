import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Room} from 'src/@type/building';

interface FilterRoomsState {
  filterRooms: Room[];
}

const initialState: FilterRoomsState = {
  filterRooms: [],
};

const filterRoomsSlice = createSlice({
  name: 'filterRooms',
  initialState,
  reducers: {
    setFilterRooms(state, action: PayloadAction<Room[]>) {
      state.filterRooms = action.payload;
    },
  },
});

export const {setFilterRooms} = filterRoomsSlice.actions;
export default filterRoomsSlice.reducer;
