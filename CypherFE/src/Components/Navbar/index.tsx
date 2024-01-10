import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/store';
import { toggleDarkMode } from '../../Features/Theme/ThemeSlice';

type NavbarProps = {
  onMenuClick: () => void;
};

const Index: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={onMenuClick} edge="start">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Cypher
        </Typography>
        <IconButton color="inherit" onClick={() => dispatch(toggleDarkMode())}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Index;
