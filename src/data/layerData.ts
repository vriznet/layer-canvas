import { PsLayerKind } from '../types/layerData';

export const initialLayers = [
  {
    id: 1,
    x: -20,
    y: -20,
    width: 320,
    height: 220,
    imageURL: 'https://picsum.photos/320/220?random=1',
    layerKind: PsLayerKind.Pixel,
  },
  {
    id: 2,
    x: 60,
    y: 70,
    width: 40,
    height: 80,
    layerKind: PsLayerKind.Shape,
  },
  {
    id: 3,
    x: 80,
    y: 90,
    width: 90,
    height: 90,
    imageURL: 'https://picsum.photos/90/90?random=3',
    layerKind: PsLayerKind.Pixel,
  },
];
