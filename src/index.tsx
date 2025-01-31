import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainGame from './MainGame';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <MainGame />
  </React.StrictMode>
);

reportWebVitals();
