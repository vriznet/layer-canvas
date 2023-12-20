import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PsLayer } from '../../types/layerData';
import { RootState } from '.';
import { initialLayers } from '../../data/layerData';

export interface LayerDataState {
  layers: PsLayer[];
}

const initialState: LayerDataState = {
  layers: initialLayers,
};

export const layerDataSlice = createSlice({
  name: 'layerData',
  initialState,
  reducers: {
    setLayers: (state, action: PayloadAction<PsLayer[]>) => {
      state.layers = action.payload;
    },
    addOneLayer: (state, action: PayloadAction<PsLayer>) => {
      state.layers.push(action.payload);
    },
  },
});

export const { setLayers, addOneLayer } = layerDataSlice.actions;

export const selectLayers = (state: RootState) => state.layerData.layers;

export default layerDataSlice.reducer;
