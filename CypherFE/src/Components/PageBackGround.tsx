import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const PageBackGround = styled(Box)(({ theme: Theme }) => ({
  [Theme.breakpoints.up('md')]: {
    marginTop: '64px',
  },
  height: '90vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Theme.palette.mode === 'light' ? 'white' : 'black',
}));
