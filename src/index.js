import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './Context/UserContext';
import { TokenProvider } from './Context/TokenContext';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from './components/Misc/DarkModeContext';
import { ModalProvider } from './Context/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
