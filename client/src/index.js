import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./sass/index.scss"
import Provider from './components/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
    <App />
    </Provider>
  </React.StrictMode>
);
