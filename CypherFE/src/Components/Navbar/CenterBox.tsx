import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const CenterBox = styled(Box)(({ theme: Theme }) => ({
  height: 600,
  width: 400,
  border: '1px solid',
  borderColor: Theme.palette.mode === 'light' ? 'blue' : 'orange',
  borderRadius: 15,
  padding: 15,
}));
