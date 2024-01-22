import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { RootState, useAppDispatch } from '../../Redux/store';
import { toggleDarkMode } from '../../Features/Theme/ThemeSlice';

const ThemeToggleButton: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
