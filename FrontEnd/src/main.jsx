import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import App from './App';
import './index.css';
import { AIChatProvider } from './context/AIChatContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AIChatProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </AIChatProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
