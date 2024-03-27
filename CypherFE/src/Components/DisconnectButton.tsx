import React from 'react';
import { IconButton } from '@mui/material';
import Client from '../Features/NeoSocket/Client';
import SickIcon from '@mui/icons-material/Sick';

const DisconnectButton: React.FC = () => {
  async function handleDisconnectClick() {
    Client?.closeConnection();
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleDisconnectClick}>
        <SickIcon />
      </IconButton>
    </>
  );
};

export default DisconnectButton;
