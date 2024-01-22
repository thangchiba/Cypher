import React from 'react';
import { IconButton } from '@mui/material';
import Client from '../API/Client';
import CachedIcon from '@mui/icons-material/Cached';
import useRoom from '../Pages/Room/useRoom';

const ReconnectButton: React.FC = () => {
  const { enterRoom } = useRoom();

  async function handleReconnectClick() {
    Client?.reconnect();
    await Client.connect(3000);
    await enterRoom();
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleReconnectClick}>
        <CachedIcon />
      </IconButton>
    </>
  );
};

export default ReconnectButton;
