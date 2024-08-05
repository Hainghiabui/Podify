import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Room} from 'src/@type/building';

interface FilterBlockStatusState {
  filterBlockStatus: string[];
}

const initialState: FilterBlockStatusState = {
  filterBlockStatus: [],
};

const filterBlockStatusSlice = createSlice({
  name: 'filterBlockStatus',
  initialState,
  reducers: {
    setFilterBlockStatus(state, action: PayloadAction<string[]>) {
      state.filterBlockStatus = action.payload;
    },
    clearFilterBlockStatus(state) {
      state.filterBlockStatus = [];
    },
  },
});

export const {setFilterBlockStatus, clearFilterBlockStatus} =
  filterBlockStatusSlice.actions;
export default filterBlockStatusSlice.reducer;
