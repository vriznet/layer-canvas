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
    changeLayerAppearance: (
      state,
      action: PayloadAction<{
        id: number;
        x: number;
        y: number;
        width: number;
        height: number;
      }>
    ) => {
      const { id, x, y } = action.payload;
      const targetLayer = state.layers.find((layer) => layer.id === id);
      if (targetLayer) {
        targetLayer.x = x;
        targetLayer.y = y;
      }
    },
  },
});

export const { setLayers, addOneLayer, changeLayerAppearance } =
  layerDataSlice.actions;

export const selectOneLayer = (state: RootState, id: number) => {
  return state.layerData.layers.find((layer) => layer.id === id);
};
export const selectLayers = (state: RootState) => state.layerData.layers;

export default layerDataSlice.reducer;
