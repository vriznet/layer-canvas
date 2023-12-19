import { combineReducers } from '@reduxjs/toolkit';
import layerDataReducer from './layerDataSlice';

export const rootReducer = combineReducers({
  layerData: layerDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
