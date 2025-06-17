// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';     // NO “.tsx” extension here
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);