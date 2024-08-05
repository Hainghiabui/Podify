import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Room} from 'src/@type/building';

interface FilterStatusState {
  filterStatus: string[];
}

const initialState: FilterStatusState = {
  filterStatus: [],
};

const filterStatusSlice = createSlice({
  name: 'filterStatus',
  initialState,
  reducers: {
    setFilterStatus(state, action: PayloadAction<string[]>) {
      state.filterStatus = action.payload;
    },
  },
});

export const {setFilterStatus} = filterStatusSlice.actions;
export default filterStatusSlice.reducer;
