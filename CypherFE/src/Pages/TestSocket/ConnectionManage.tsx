// ConnectionManage.tsx
import React from 'react';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../Redux/store';
import { closeConnection, openConnection } from '../../Features/NeoSocket/NeoSocketReducer';

const ConnectionManage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { client, isConnected } = useSelector((state: RootState) => state.neosocket);
  return (
    <>
      <Button onClick={() => dispatch(openConnection())}>Open Connection</Button>
      <Button onClick={() => dispatch(closeConnection())}>Close Connection</Button>
      <Typography>{isConnected ? 'Connecting' : 'Discconected'}</Typography>
    </>
  );
};

export default ConnectionManage;
