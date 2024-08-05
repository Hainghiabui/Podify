import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Room} from 'src/@type/building';

interface HkStatusState {
  hkStatus: string;
}

const initialState: HkStatusState = {
  hkStatus: '',
};

const hkStatusSlice = createSlice({
  name: 'hkStatus',
  initialState,
  reducers: {
    setHkStatus(state, action: PayloadAction<string>) {
      state.hkStatus = action.payload;
    },
  },
});

export const {setHkStatus} = hkStatusSlice.actions;
export default hkStatusSlice.reducer;
