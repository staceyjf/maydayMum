// theme.js
import { createTheme } from "@mui/material/styles";

const theme = (mode) =>
  createTheme({
    palette: {
      primary: {
        mode: 'light',
        main: '#5C3F79',
        light: '#7C6593',
        dark: '#402C54',
        contrastText: '#fff',
      },
      secondary: {
        main: '#5c793f',
        light: '#7C9365',
        dark: '#40542C',
        contrastText: '#fff',
      }, 
      text: {
        primary: 'rgba(0,0,0,0.96)',
      },
    },
    // typography: {
    //   fontFamily: 'Georgia',
    // },
    props: {
      MuiAppBar: {
        color: 'default',
      },
    },
  });

export default theme;