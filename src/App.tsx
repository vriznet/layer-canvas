// #region : imports
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from './components/GlobalStyles';
import {
  addOneLayer,
  changeLayerData,
  selectLastLayerId,
  deleteAllLayers,
  deleteLayers,
  deleteOneLayer,
  selectLayers,
  setLastLayerId,
  setLayers,
} from './redux/module/layerDataSlice';
import styled from 'styled-components';
import { PointerEventHandler, useEffect, useRef, useState } from 'react';
import { createEmptyLayerData, getRandomColorString, loadImage } from './utils';
import { initialLayers } from './data/layerData';
import { Appearance } from './types/common';
import { baseAppearance } from './data/common';
import { PsLayerKind } from './types/layerData';
// #endregion : imports

// #region : types
interface ILayerCanvasContainerSCProps {
  $x: number;
  $y: number;
  $width: number;
  $height: number;
}
interface ILayerCanvasSCProps {
  $zIndex: number;
}

interface IRectBlueprintSCProps {
  $x: number;
  $y: number;
  $width: number;
  $height: number;
  $zIndex: number;
}

type ImageURLAndLayerId = {
  imageURL: string;
  layerId: number;
};
// #endregion : types

// #region : styled components
const CanvasArea = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background-color: #333;
  overflow: hidden;
  touch-action: none;
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

const RectBlueprintSC = styled.div.attrs<IRectBlueprintSCProps>((props) => ({
  style: {
    top: props.$height < 0 ? props.$y + props.$height : props.$y,
    left: props.$width < 0 ? props.$x + props.$width : props.$x,
    width: Math.abs(props.$width),
    height: Math.abs(props.$height),
    zIndex: props.$zIndex,
  },
}))<IRectBlueprintSCProps>`
  position: absolute;
  background-color: transparent;
  border: 1px solid #37f;
`;
// #endregion : styled components

const App = () => {
  // #region : states
  const [isImagesLoading, setIsImagesLoading] = useState(false);

  const [rectBluePrintAppearance, setRectBluePrintAppearance] =
    useState<Appearance>(baseAppearance);
  // #endregion : states

  // #region : redux
  const dispatch = useDispatch();

  const layers = useSelector(selectLayers);
  const lastLayerId = useSelector(selectLastLayerId);
  // #endregion : redux

  // #region : refs
  const layerCanvasContainerRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : handlers
  const onCanvasAreaPointerDown: PointerEventHandler = (event) => {
    event.preventDefault();
    const pointedCoords = {
      x: event.clientX,
      y: event.clientY,
    };
    const pointerMoveHandler = (event: PointerEvent) => {
      const deltaX = event.clientX - pointedCoords.x;
      const deltaY = event.clientY - pointedCoords.y;
      setRectBluePrintAppearance({
        x: pointedCoords.x,
        y: pointedCoords.y,
        width: deltaX,
        height: deltaY,
        zIndex: 9999,
      });
    };
    const pointerUpHandler = (event: PointerEvent) => {
      const deltaX = event.clientX - pointedCoords.x;
      const deltaY = event.clientY - pointedCoords.y;
      const newLayerId = lastLayerId + 1;
      dispatch(
        addOneLayer({
          layer: createEmptyLayerData(newLayerId),
          targetIndex: layers.length,
        })
      );
      dispatch(setLastLayerId(newLayerId));
      const layerCanvasContainerBoundingRect =
        layerCanvasContainerRef.current!.getBoundingClientRect();
      dispatch(
        changeLayerData({
          id: newLayerId,
          x: pointedCoords.x - layerCanvasContainerBoundingRect.left,
          y: pointedCoords.y - layerCanvasContainerBoundingRect.top,
          width: deltaX,
          height: deltaY,
        })
      );
      setRectBluePrintAppearance(baseAppearance);
      document.removeEventListener('pointermove', pointerMoveHandler);
    };
    document.addEventListener('pointermove', pointerMoveHandler);
    document.addEventListener('pointerup', pointerUpHandler, {
      once: true,
    });
  };

  const onNewEmptyLayerButtonClick = () => {
    const layerId = lastLayerId + 1;
    dispatch(
      addOneLayer({
        layer: createEmptyLayerData(layerId),
        targetIndex: layers.length,
      })
    );
    dispatch(setLastLayerId(layerId));
  };

  const onNewRectShapeLayerButtonClick = () => {
    const layerId = lastLayerId + 1;
    dispatch(
      addOneLayer({
        layer: createEmptyLayerData(layerId),
        targetIndex: layers.length,
      })
    );
    dispatch(setLastLayerId(layerId));
    dispatch(
      changeLayerData({
        id: layerId,
        x: Math.floor(Math.random() * 300),
        y: Math.floor(Math.random() * 200),
        width: Math.floor(Math.random() * 300),
        height: Math.floor(Math.random() * 200),
        layerKind: PsLayerKind.Shape,
      })
    );
  };

  const onNewImageLayerButtonClick = () => {
    const layerId = lastLayerId + 1;
    dispatch(
      addOneLayer({
        layer: createEmptyLayerData(layerId),
        targetIndex: layers.length,
      })
    );
    dispatch(setLastLayerId(layerId));
    dispatch(
      changeLayerData({
        id: layerId,
        x: Math.floor(Math.random() * 300),
        y: Math.floor(Math.random() * 200),
        width: 30,
        height: 20,
        imageURL: `https://picsum.photos/30/20?random=${layerId}`,
      })
    );
  };

  const onResetToDefaultLayersButtonClick = () => {
    dispatch(setLayers(initialLayers));
  };

  const onDeleteTopLayerButtonClick = () => {
    const topLayer = layers[layers.length - 1];
    if (topLayer) {
      dispatch(deleteOneLayer(topLayer.id));
    }
  };

  const onDeleteIdOneAndTwoLayersButtonClick = () => {
    if (layers.find((layer) => layer.id === 1)) {
      dispatch(deleteOneLayer(1));
    }
    if (layers.find((layer) => layer.id === 2)) {
      dispatch(deleteOneLayer(2));
    }
  };

  const onDeleteAllLayersButtonClick = () => {
    dispatch(deleteAllLayers());
  };
  // #endregion : handlers

  // #region : effects
  useEffect(() => {
    const loadAndRender = async () => {
      /* setIsImagesLoading(true);
      const imageURLsAndLayerIds: ImageURLAndLayerId[] = []; */
      const shapeLayers = layers.filter(
        (layer) => layer.layerKind === PsLayerKind.Shape
      );
      /* for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if (layer.imageURL) {
          imageURLsAndLayerIds.push({
            imageURL: layer.imageURL,
            layerId: layer.id,
          });
        }
      } */
      /* const images = await Promise.all(
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
      }); */
      shapeLayers.forEach((layer) => {
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
  // #endregion : effects

  return (
    <>
      <GlobalStyles />
      <div>
        {isImagesLoading ? <p>Loading...</p> : <p>Images are loaded</p>}
      </div>
      <CanvasArea onPointerDown={onCanvasAreaPointerDown}>
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
      <button onClick={onNewRectShapeLayerButtonClick}>
        New rect shape layer
      </button>
      <button onClick={onNewImageLayerButtonClick}>New image layer</button>
      <button onClick={onResetToDefaultLayersButtonClick}>
        Reset to default layers
      </button>
      <button onClick={onDeleteTopLayerButtonClick}>Delete top layer</button>
      <button onClick={onDeleteIdOneAndTwoLayersButtonClick}>
        Delete layers with ids 1 and 2
      </button>
      <button onClick={onDeleteAllLayersButtonClick}>Delete all layers</button>
      <RectBlueprintSC
        $x={rectBluePrintAppearance.x}
        $y={rectBluePrintAppearance.y}
        $width={rectBluePrintAppearance.width}
        $height={rectBluePrintAppearance.height}
        $zIndex={rectBluePrintAppearance.zIndex}
      ></RectBlueprintSC>
    </>
  );
};

export default App;
