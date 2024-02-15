// ConnectionManage.tsx
import React from 'react';
import { Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import Client from '../../API/Client';
import SensorsIcon from '@mui/icons-material/Sensors';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';

const ConnectionManage: React.FC = () => {
  const { isConnected } = useSelector((state: RootState) => state.neosocket);
  return (
    <Stack sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingBlock: 2 }} spacing={3} direction={'row'}>
      <Button onClick={() => Client.reconnect()}>Open Connection</Button>
      <Button onClick={() => Client.closeConnection()}>Close Connection</Button>
      {/*<Typography>{isConnected ? 'Connecting' : 'Discconected'}</Typography>*/}
      {/*Make Sensorcolor be green*/}
      {isConnected ? <SensorsIcon color={'success'} /> : <SensorsOffIcon color={'error'} />}
    </Stack>
  );
};

export default ConnectionManage;
