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
      x: 0,
      y: 0,
      width: 100,
      height: 100,
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
