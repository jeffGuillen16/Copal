import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './globalElems.css';
import Rutas from './routes'


// Este id root es donde se renderizan los componentes en react.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rutas/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

