import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NeoSocket } from './Utils/NeoSocket/NeoSocketLib/NeoSocket';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import 'react-toastify/dist/ReactToastify.css';

NeoSocket.setup();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
