import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { cleanupRedirectParams } from './lib/storage';
import './index.css';

// Limpiar parámetros de redirección bancaria que pueden causar pantalla en blanco en Chrome
cleanupRedirectParams();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
