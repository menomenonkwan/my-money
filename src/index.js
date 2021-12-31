import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeContextProvider } from './context/ThemeContext';
// styles
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

