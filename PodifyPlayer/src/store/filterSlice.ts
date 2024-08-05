import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FilterState {
  filter: boolean;
}

const initialState: FilterState = {
  filter: false,
};

const filterSlice = createSlice({
  name: 'isFilter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<boolean>) {
      state.filter = action.payload;
    },
  },
});

export const {setFilter} = filterSlice.actions;
export default filterSlice.reducer;
