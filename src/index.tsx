
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { GlobalRoute } from './components/router/global-route';
import { store } from './store';

import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


root.render(
  <Provider store={store}>
    <GlobalRoute />
  </Provider>
);