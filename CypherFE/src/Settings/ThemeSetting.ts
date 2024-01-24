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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2', // Use primary color for light mode
          color: '#fff',
          '&:hover': {
            backgroundColor: '#115293', // Darken on hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Add any specific styles you want for TextField in light mode
        },
      },
    },
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
    error: {
      main: '#ff9800', // Define an error-like yellow-orange color for dark mode
    },
    text: {
      primary: '#fff',
      secondary: '#aaa',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ff9800', // Use error-like color for dark mode
          color: '#000',
          '&:hover': {
            backgroundColor: '#e68900', // Darken on hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Customize the background color to fit dark mode
          backgroundColor: '#1e1e1e',
          // Change the text color
          color: '#fff',
          // Customize the border color
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ff9800', // Example: orange border
            },
            '&:hover fieldset': {
              borderColor: '#e68900', // Darken border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff9800', // Maintain orange border when focused
            },
          },
          // Customize the label color
          '& .MuiInputLabel-root': {
            color: '#aaa', // Example: light grey label
            '&.Mui-focused': {
              color: '#ff9800', // Orange label when focused
            },
          },
          // Customize the input text color
          '& .MuiInputBase-input': {
            color: '#fff', // White input text
          },
        },
      },
    },
  },
});

export const getTheme = (darkMode: boolean) => (darkMode ? darkTheme : lightTheme);
