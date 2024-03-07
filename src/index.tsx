import { RouteProvider } from 'app/providers/RouteProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import ReactDOM from 'react-dom/client';
import './app/styles/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StoreProvider>
    <RouteProvider />
  </StoreProvider>
);
