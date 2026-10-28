import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { AuthProvider } from './app/auth-context';
import '@sgt/design-system/tokens.css';
import '@sgt/design-system/base.css';
import '@sgt/design-system/components.css';
import '@sgt/design-system/print.css';
import './styles/documents.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
