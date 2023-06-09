import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./sass/index.scss"
import { Provider } from 'react-redux'
import { store, persistor } from './components/store/store';
import { PersistGate } from 'redux-persist/integration/react'

console.log(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


