import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Building {
  id: number;
  text: string;
  value: string;
}

interface SelectedBuildingState {
  selectedBuilding: Building;
}

const initialState: SelectedBuildingState = {
  selectedBuilding: {
    id: 0,
    text: '',
    value: '',
  },
};

const selectedBuildingSlice = createSlice({
  name: 'selectedBuilding',
  initialState,
  reducers: {
    setSelectedBuildingValue(state, action: PayloadAction<string>) {
      state.selectedBuilding.value = action.payload;
    },
  },
});

export const {setSelectedBuildingValue} = selectedBuildingSlice.actions;
export default selectedBuildingSlice.reducer;
