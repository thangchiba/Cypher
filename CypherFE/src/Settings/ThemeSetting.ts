import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
  },
  typography: {
    // Customizations for light theme typography
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#fff',
      secondary: '#aaa',
    },
  },
  typography: {
    // Customizations for dark theme typography
  },
  components: {
    // Component style overrides for dark theme
    MuiButton: {
      styleOverrides: {
        root: {
          // Button styles for dark theme
        },
      },
    },
  },
});

export const getTheme = (darkMode: boolean) => (darkMode ? darkTheme : lightTheme);
