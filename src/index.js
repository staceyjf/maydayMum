import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// Setting MUI themes
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import './index.css';
import App from './pages/App/App';
import outerTheme from './themes/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={ outerTheme }>
    <CssBaseline />
    <React.StrictMode>
      <Router><App /></Router>
    </React.StrictMode>
  </ThemeProvider>
);
