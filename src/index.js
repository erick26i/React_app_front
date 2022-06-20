import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './Context/UserContext';
import { TokenProvider } from './Context/TokenContext';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './Context/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <ModalProvider>
          <UserProvider>
            <TokenProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </TokenProvider>
          </UserProvider>
        </ModalProvider>
  </React.StrictMode>
);
