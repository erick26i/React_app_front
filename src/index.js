import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './Context/UserContext';
import { TokenProvider } from './Context/TokenContext';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from './Context/DarkModeContext';
import { ModalProvider } from './Context/ModalContext';
import { ServiceIdProvider } from './Context/IdContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ServiceIdProvider>
        <ModalProvider>
          <DarkModeProvider>
            <UserProvider>
              <TokenProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </TokenProvider>
            </UserProvider>
          </DarkModeProvider>
        </ModalProvider>
      </ServiceIdProvider>
  </React.StrictMode>
)
