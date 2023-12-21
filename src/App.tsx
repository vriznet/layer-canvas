import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from './components/GlobalStyles';
import {
  addOneLayer,
  selectLayers,
  setLayers,
} from './redux/module/layerDataSlice';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { createEmptyLayerData, getRandomColorString, loadImage } from './utils';
import { initialLayers } from './data/layerData';

interface ILayerCanvasContainerSCProps {
  $x: number;
  $y: number;
  $width: number;
  $height: number;
}
interface ILayerCanvasSCProps {
  $zIndex: number;
}

type ImageURLAndLayerId = {
  imageURL: string;
  layerId: number;
};

const CanvasArea = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
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
  const [isImagesLoading, setIsImagesLoading] = useState(false);

  const dispatch = useDispatch();
  const layers = useSelector(selectLayers);

  const layerCanvasContainerRef = useRef<HTMLDivElement>(null);

  const onNewEmptyLayerButtonClick = () => {
    dispatch(
      addOneLayer({
        layer: createEmptyLayerData(layers.length),
        targetIndex: layers.length,
      })
    );
  };

  const onResetToDefaultLayersButtonClick = () => {
    dispatch(setLayers(initialLayers));
  };

  useEffect(() => {
    const loadAndRender = async () => {
      setIsImagesLoading(true);
      const imageURLsAndLayerIds: ImageURLAndLayerId[] = [];
      const noImageLayers = layers.filter((layer) => !layer.imageURL);
      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if (layer.imageURL) {
          imageURLsAndLayerIds.push({
            imageURL: layer.imageURL,
            layerId: layer.id,
          });
        }
      }
      const images = await Promise.all(
        imageURLsAndLayerIds.map(({ imageURL }) => loadImage(imageURL))
      );
      setIsImagesLoading(false);
      imageURLsAndLayerIds.forEach((imageURLAndLayerId) => {
        const { imageURL, layerId } = imageURLAndLayerId;
        const layer = layers.find((l) => l.id === layerId);
        if (layer) {
          const canvas = document.getElementById(
            `layer-canvas-${layer.id}`
          ) as HTMLCanvasElement;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(
              images.find((image) => image.src === imageURL)!,
              layer.x,
              layer.y
            );
          }
        }
      });
      noImageLayers.forEach((layer) => {
        if (layer.width && layer.height) {
          const canvas = document.getElementById(
            `layer-canvas-${layer.id}`
          ) as HTMLCanvasElement;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = getRandomColorString();
            ctx.fillRect(layer.x, layer.y, layer.width, layer.height);
          }
        }
      });
    };
    loadAndRender();
  }, [layers]);

  return (
    <>
      <GlobalStyles />
      <div>
        {isImagesLoading ? <p>Loading...</p> : <p>Images are loaded</p>}
      </div>
      <CanvasArea>
        <LayerCanvasContainer
          $x={20}
          $y={20}
          $width={300}
          $height={200}
          ref={layerCanvasContainerRef}
        >
          {layers.map((layer) => (
            <LayerCanvasSC
              key={layer.id}
              id={`layer-canvas-${layer.id}`}
              $zIndex={layers.findIndex((l) => l.id === layer.id) + 1}
              width={300}
              height={200}
            ></LayerCanvasSC>
          ))}
        </LayerCanvasContainer>
      </CanvasArea>
      <button onClick={onNewEmptyLayerButtonClick}>New empty layer</button>
      <button onClick={onResetToDefaultLayersButtonClick}>
        Reset to default layers
      </button>
    </>
  );
};

export default App;
