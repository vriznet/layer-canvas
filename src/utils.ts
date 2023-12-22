import { PsLayer, PsLayerKind } from './types/layerData';

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject();
    };
    image.src = url;
  });
};

export const createEmptyLayerData = (layerId: number): PsLayer => {
  return {
    id: layerId,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    layerKind: PsLayerKind.Pixel,
  };
};

export const getRandomColorString = (): string => {
  const letters = '0123456789ABCDEF';
  let colorString = '#';
  for (let i = 0; i < 6; i++) {
    colorString += letters[Math.floor(Math.random() * 16)];
  }
  return colorString;
};
