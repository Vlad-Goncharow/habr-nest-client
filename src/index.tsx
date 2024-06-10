import { RouteProvider } from 'app/providers/RouteProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { QueryProvider } from 'app/providers/QueryProvider';
import ReactDOM from 'react-dom/client';
import './app/styles/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryProvider>
    <StoreProvider>
      <RouteProvider />
    </StoreProvider>
  </QueryProvider>
);
