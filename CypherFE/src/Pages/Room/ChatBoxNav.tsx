import React from 'react';
import { Box, styled, Theme } from '@mui/material';
import ThemeToggleButton from '../../Components/Setup/ThemeToggleButton';
import SettingsButton from '../../Components/Setup/SettingsButton';
import HomeButton from '../../Components/HomeButton';
import ReconnectButton from '../../Components/ReconnectButton';
import DisconnectButton from '../../Components/DisconnectButton';

const FloatingBar = styled(Box)(({ theme }: { theme: Theme }) => ({
  // position: 'sticky',
  display: 'flex',
  justifyContent: 'space-around',
  top: 0,
  padding: 0,
  margin: 0,
  height: '5%',
}));

const ChatBoxNav: React.FC = () => {
  return (
    <FloatingBar>
      <HomeButton />
      <ThemeToggleButton />
      <DisconnectButton />
      <ReconnectButton />
      <SettingsButton />
    </FloatingBar>
  );
};

export default ChatBoxNav;
