import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PsLayer } from '../../types/layerData';
import { RootState } from '.';
import { initialLayers } from '../../data/layerData';

export interface LayerDataState {
  layers: PsLayer[];
  lastLayerId: number;
}

const initialState: LayerDataState = {
  layers: initialLayers,
  lastLayerId: initialLayers.length,
};

export const layerDataSlice = createSlice({
  name: 'layerData',
  initialState,
  reducers: {
    setLayers: (state, action: PayloadAction<PsLayer[]>) => {
      state.layers = action.payload;
    },
    addOneLayer: (
      state,
      action: PayloadAction<{
        layer: PsLayer;
        targetIndex?: number;
      }>
    ) => {
      state.layers.splice(
        action.payload.targetIndex || state.layers.length,
        0,
        action.payload.layer
      );
    },
    changeLayerData: (
      state,
      action: PayloadAction<{
        id: number;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        imageURL?: string;
      }>
    ) => {
      const { id, x, y, width, height, imageURL } = action.payload;
      const targetLayer = state.layers.find((layer) => layer.id === id);
      if (!targetLayer) return console.error('no layer found');
      targetLayer.x = x || targetLayer.x;
      targetLayer.y = y || targetLayer.y;
      targetLayer.width = width || targetLayer.width;
      targetLayer.height = height || targetLayer.height;
      targetLayer.imageURL = imageURL || targetLayer.imageURL;
    },
  },
});

export const { setLayers, addOneLayer, changeLayerData } =
  layerDataSlice.actions;

export const selectOneLayer = (state: RootState, id: number) =>
  state.layerData.layers.find((layer) => layer.id === id);
export const selectLayers = (state: RootState) => state.layerData.layers;
export const selectLastLayerId = (state: RootState) =>
  state.layerData.lastLayerId;

export default layerDataSlice.reducer;
