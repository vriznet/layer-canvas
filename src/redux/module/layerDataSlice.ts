import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PsLayer } from '../../types/layerData';
import { RootState } from '.';

export interface LayerDataState {
  layers: PsLayer[];
}

const initialState: LayerDataState = {
  layers: [
    {
      id: 1,
      x: 30,
      y: 50,
      width: 80,
      height: 60,
    },
    {
      id: 2,
      x: 60,
      y: 70,
      width: 40,
      height: 80,
    },
    {
      id: 3,
      x: 80,
      y: 90,
      width: 90,
      height: 90,
    },
  ],
};

export const layerDataSlice = createSlice({
  name: 'layerData',
  initialState,
  reducers: {
    setLayers: (state, action: PayloadAction<PsLayer[]>) => {
      state.layers = action.payload;
    },
  },
});

export const { setLayers } = layerDataSlice.actions;

export const selectLayers = (state: RootState) => state.layerData.layers;

export default layerDataSlice.reducer;
