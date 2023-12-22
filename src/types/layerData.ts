export type PsLayer = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  imageURL?: string;
  layerKind: PsLayerKind;
};

export enum PsLayerKind {
  Pixel = 'PIXEL',
  Adjustment = 'ADJUSTMENT',
  Type = 'TYPE',
  Shape = 'SHAPE',
  Smartobject = 'SMARTOBJECT',
}
