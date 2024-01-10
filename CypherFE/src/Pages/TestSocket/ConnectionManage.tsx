// ConnectionManage.tsx
import React from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { closeConnection, openConnection } from '../../Features/NeoSocket/NeoSocketSlice';

const ConnectionManage: React.FC = () => {
  const dispatch = useDispatch();
  const { client, isConnecting } = useSelector((state: RootState) => state.neosocket);

  return (
    <>
      <Button onClick={() => dispatch(openConnection())}>Open Connection</Button>
      <Button onClick={() => dispatch(closeConnection())}>Close Connection</Button>
      <Typography>{isConnecting ? 'Connecting' : 'Discconected'}</Typography>
    </>
  );
};

export default ConnectionManage;
