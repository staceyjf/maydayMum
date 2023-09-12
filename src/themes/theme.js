// theme.js
import { createTheme } from "@mui/material/styles";

let outerTheme = (mode) =>
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
        secondary: 'rgba(0,0,0,0.6)',
      },
    },
    typography: {
      // fontFamily: 'Georgia',
      h3: {
        fontSize: '2rem',
      },
      h6: {
        fontSize: '0.75rem',
      },
    },
    props: {
      MuiAppBar: {
        color: 'default',
      },
    },
    components: {
      MuiRadioGroup: {
        styleOverrides: {
          root: {
            color: 'rgba(0,0,0,0.6)', 
          },},},
      MuiFormControlLabel: { 
        styleOverrides: {
          label: {
            color: 'rgba(0, 0, 0, 0.6)', 
          },},},
      MuiGrid: {
        styleOverrides: {
          item: {
            margin: 0,
          },},},
   },
});

export default outerTheme;