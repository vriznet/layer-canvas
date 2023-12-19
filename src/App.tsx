import { useSelector } from 'react-redux';
import { GlobalStyles } from './components/GlobalStyles';
import { selectLayers } from './redux/module/layerDataSlice';

const App = () => {
  const layers = useSelector(selectLayers);

  return (
    <>
      <GlobalStyles />
      <ul>
        {layers.map((layer) => (
          <li key={layer.id}>
            x: {layer.x}, y: {layer.y}, width: {layer.width}, height:{' '}
            {layer.height}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
