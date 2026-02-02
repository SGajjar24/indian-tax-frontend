import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2',
      light: '#6BA5E7',
      dark: '#3A73B5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2ECC71',
      light: '#4FDD8D',
      dark: '#25A25A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    grey: {
      100: '#F8F9FA',
      200: '#E0E0E0',
      300: '#CCCCCC',
      500: '#9E9E9E',
      700: '#616161',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Poppins", "Roboto", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Poppins", "Roboto", sans-serif', fontWeight: 600 },
    h3: { fontFamily: '"Poppins", "Roboto", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Poppins", "Roboto", sans-serif', fontWeight: 500 },
    h5: { fontFamily: '"Poppins", "Roboto", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Poppins", "Roboto", sans-serif', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
  shape: { borderRadius: 8 },
});

export default theme;
