import { createTheme } from "@mui/material/styles";

let outerTheme = (mode) =>
  createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#494c7d',
        contrastText: '#fff',
      },
      secondary: {
        main: '#2a9461',
        contrastText: '#fff',
      },
      background: {
        default: 'rgba(92, 121, 63, 0.04)',
        paper: '#fff',
      },
    },
    props: {
      MuiAppBar: {
        color: 'default',
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'rgba(0,0,0,0.6)', 
          },
          h3: {
            textAlign: 'center',
          },
          h5: {
            textAlign: 'center',
          },
        },
      },
      MuiRadioGroup: {
        styleOverrides: {
          root: {
            color: 'rgba(0,0,0,0.6)',
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            color: 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          item: {
            margin: 0,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            padding: '10px',
          },
        },
      },
    },
  });

export default outerTheme;
