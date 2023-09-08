import React from 'react';
import ReactDOM from 'react-dom/client';
// import BrowserRouter which includes the alias
import { BrowserRouter as Router } from 'react-router-dom';

// Setting MUI themes
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import './index.css';
import App from './pages/App/App';
import theme from "./themes/theme";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <Router><App /></Router>
    </React.StrictMode>
  </ThemeProvider>
);

