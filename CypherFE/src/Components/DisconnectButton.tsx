import React from 'react';
import { IconButton } from '@mui/material';
import Client from '../API/Client';
import SickIcon from '@mui/icons-material/Sick';
import useRoom from '../Pages/Room/useRoom';
import { useAppDispatch } from '../Redux/store';
import { enterRoom } from '../Features/Chat/ChatSlice';

const DisconnectButton: React.FC = () => {
  const dispatch = useAppDispatch();
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
