import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import '@sgt/design-system/tokens.css';
import '@sgt/design-system/base.css';
import '@sgt/design-system/components.css';
import './styles/intranet.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
