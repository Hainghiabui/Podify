import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Floor {
  id: number;
  text: string;
  value: string;
}

interface SelectedFloorsState {
  selectedFloors: Floor[];
}

const initialState: SelectedFloorsState = {
  selectedFloors: [],
};

const selectedFloorsSlice = createSlice({
  name: 'selectedFloors',
  initialState,
  reducers: {
    setSelectedFloors(state, action: PayloadAction<Floor[]>) {
      state.selectedFloors = action.payload;
    },
    clearSelectedFloors(state) {
      state.selectedFloors = [];
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.selectedFloors = state.selectedFloors.filter(
        floor => floor.text !== action.payload,
      );
    },
  },
});

export const {setSelectedFloors, clearSelectedFloors, deleteItem} =
  selectedFloorsSlice.actions;
export default selectedFloorsSlice.reducer;
