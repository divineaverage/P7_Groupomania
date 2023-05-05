import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/index.scss';
import App from './app';
import "bootstrap/dist/css/bootstrap.min.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
