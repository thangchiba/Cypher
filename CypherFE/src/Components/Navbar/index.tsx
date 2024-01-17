import React from 'react';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { toggleDarkMode } from '../../Features/Theme/ThemeSlice'; // Import the settings icon

type NavbarProps = {
  onSettingClick: () => void;
};

const Index: React.FC<NavbarProps> = ({ onSettingClick }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h6" noWrap>
              Cypher
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton color="inherit" onClick={() => dispatch(toggleDarkMode())}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon onClick={onSettingClick} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Index;
