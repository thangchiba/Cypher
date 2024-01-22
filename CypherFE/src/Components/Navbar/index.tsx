import React from 'react';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ThemeToggleButton from '../Setup/ThemeToggleButton';
import SettingsButton from '../Setup/SettingsButton'; // Import the settings icon

type NavbarProps = {
  // onSettingClick: () => void;
};

const Index: React.FC<NavbarProps> = (props) => {
  return (
    <Box display={{ xs: 'none', md: 'block', marginBottom: '64px' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h6" noWrap>
                Cypher
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ThemeToggleButton />
              <SettingsButton />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Index;
