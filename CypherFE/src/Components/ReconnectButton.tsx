import React from 'react';
import { IconButton } from '@mui/material';
import Client from '../Features/NeoSocket/Client';
import CachedIcon from '@mui/icons-material/Cached';
import { useAppDispatch } from '../Redux/store';
import { enterRoom } from '../Features/Chat/ChatSlice';
import { toast } from 'react-toastify';

const ReconnectButton: React.FC = () => {
  const dispatch = useAppDispatch();

  async function handleReconnectClick() {
    Client?.reconnect();
    await Client.connect(3000);
    dispatch(enterRoom());
    toast.success('Reconnected Success!');
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
