import { useSelector } from 'react-redux';
import { GlobalStyles } from './components/GlobalStyles';
import { selectLayers } from './redux/module/layerDataSlice';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

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
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  z-index: 0;
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

  const layerCanvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layerCanvasContainer = layerCanvasContainerRef.current;
    if (layerCanvasContainer) {
      const { width, height, x, y } =
        layerCanvasContainer.getBoundingClientRect();
      setLayerCanvasContainerWidth(width);
      setLayerCanvasContainerHeight(height);
      setLayerCanvasContainerX(x);
      setLayerCanvasContainerY(y);
    }
  }, []);

  useEffect(() => {
    const getRandomColor = () => {
      const colors = [
        'red',
        'green',
        'blue',
        'orange',
        'purple',
        'violet',
        'gray',
        'black',
        'turquoise',
        'skyblue',
        'navy',
      ];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };

    layers.forEach((layer) => {
      const canvas = document.getElementById(
        `layer-canvas-${layer.id}`
      ) as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(layer.x, layer.y, layer.width, layer.height);
      }
    });
  }, [
    layers,
    layerCanvasContainerWidth,
    layerCanvasContainerHeight,
    layerCanvasContainerX,
    layerCanvasContainerY,
  ]);

  return (
    <>
      <GlobalStyles />
      <CanvasArea>
        <LayerCanvasContainer
          $x={layerCanvasContainerX}
          $y={layerCanvasContainerY}
          $width={layerCanvasContainerWidth}
          $height={layerCanvasContainerHeight}
          ref={layerCanvasContainerRef}
        >
          {layers.map((layer) => (
            <LayerCanvasSC
              key={layer.id}
              id={`layer-canvas-${layer.id}`}
              $zIndex={layers.findIndex((l) => l.id === layer.id) + 1}
              width={layerCanvasContainerWidth}
              height={layerCanvasContainerHeight}
            ></LayerCanvasSC>
          ))}
        </LayerCanvasContainer>
      </CanvasArea>
    </>
  );
};

export default App;
