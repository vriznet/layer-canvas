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
      x: -20,
      y: -20,
      width: 320,
      height: 220,
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
    {
      id: 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 6,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 7,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 9,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 11,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 12,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 13,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 14,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 15,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 16,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 17,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 18,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 19,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
    },
    {
      id: 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100,
      height: Math.random() * 100,
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
