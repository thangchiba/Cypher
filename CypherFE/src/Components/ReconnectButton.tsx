import React from 'react';
import { IconButton } from '@mui/material';
import Client from '../API/Client';
import CachedIcon from '@mui/icons-material/Cached';
import useRoom from '../Pages/Room/useRoom';
import { useAppDispatch } from '../Redux/store';
import { enterRoom } from '../Features/Chat/ChatSlice';

const ReconnectButton: React.FC = () => {
  const dispatch = useAppDispatch();
  async function handleReconnectClick() {
    Client?.reconnect();
    await Client.connect(3000);
    dispatch(enterRoom());
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
