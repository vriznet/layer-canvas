import { useSelector } from 'react-redux';
import { GlobalStyles } from './components/GlobalStyles';
import { selectLayers } from './redux/module/layerDataSlice';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface ILayerCanvasContainerSCProps {
  $x: number;
  $y: number;
  $width: number;
  $height: number;
}
interface ILayerCanvasSCProps {
  $zIndex: number;
}

const CanvasArea = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #333;
  overflow: hidden;
`;

const LayerCanvasContainer = styled.div<ILayerCanvasContainerSCProps>`
  position: absolute;
  background-color: #fff;
  border: 2px solid #000;
  box-sizing: content-box;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;

const LayerCanvasSC = styled.canvas<ILayerCanvasSCProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props) => props.$zIndex};
`;

const App = () => {
  const [layerCanvasContainerWidth, setLayerCanvasContainerWidth] =
    useState(300);
  const [layerCanvasContainerHeight, setLayerCanvasContainerHeight] =
    useState(200);
  const [layerCanvasContainerX, setLayerCanvasContainerX] = useState(10);
  const [layerCanvasContainerY, setLayerCanvasContainerY] = useState(10);

  const layers = useSelector(selectLayers);

  useEffect(() => {
    const layerIdOne = layers.find((layer) => layer.id === 1);
    if (layerIdOne) {
      const canvasIdOne = document.getElementById(
        `layer-canvas-${layerIdOne.id}`
      ) as HTMLCanvasElement;
      const ctx = canvasIdOne.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(
          layerIdOne.x,
          layerIdOne.y,
          layerIdOne.width,
          layerIdOne.height
        );
      }
    }
    const layerIdTwo = layers.find((layer) => layer.id === 2);
    if (layerIdTwo) {
      const canvasIdTwo = document.getElementById(
        `layer-canvas-${layerIdTwo.id}`
      ) as HTMLCanvasElement;
      const ctx = canvasIdTwo.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(
          layerIdTwo.x,
          layerIdTwo.y,
          layerIdTwo.width,
          layerIdTwo.height
        );
      }
    }
    const layerIdThree = layers.find((layer) => layer.id === 3);
    if (layerIdThree) {
      const canvasIdThree = document.getElementById(
        `layer-canvas-${layerIdThree.id}`
      ) as HTMLCanvasElement;
      const ctx = canvasIdThree.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(
          layerIdThree.x,
          layerIdThree.y,
          layerIdThree.width,
          layerIdThree.height
        );
      }
    }
  }, [layers]);

  return (
    <>
      <GlobalStyles />
      <CanvasArea>
        <LayerCanvasContainer
          $x={layerCanvasContainerX}
          $y={layerCanvasContainerY}
          $width={layerCanvasContainerWidth}
          $height={layerCanvasContainerHeight}
        >
          {layers.map((layer) => (
            <LayerCanvasSC
              key={layer.id}
              id={`layer-canvas-${layer.id}`}
              $zIndex={layers.findIndex((l) => l.id === layer.id) + 1}
            ></LayerCanvasSC>
          ))}
        </LayerCanvasContainer>
      </CanvasArea>
    </>
  );
};

export default App;
