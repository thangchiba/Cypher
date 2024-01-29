import { styled } from '@mui/material';
import Box from '@mui/material/Box';

type CenterBoxProps = {
  width?: number;
  height?: number;
};

export const CenterBox = styled(Box)<CenterBoxProps>(({ theme, width = 1000, height = 600 }) => ({
  height: height,
  width: width,
  [theme.breakpoints.down('sm')]: {
    height: '90%',
    width: 400,
  },
  border: '1px solid',
  borderColor: theme.palette.mode === 'light' ? 'blue' : 'orange',
  borderRadius: 15,
  padding: 15,
}));
