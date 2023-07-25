import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './state/store/';
import { PersistGate } from 'redux-persist/integration/react';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
);
