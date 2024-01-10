import { CircularProgress, Modal, styled, Theme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { blueGrey } from '@mui/material/colors';

const StyledBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: 170,
  height: 170,
  borderRadius: 15,
  padding: 10,
  opacity: 0.8,
  // backgroundColor: theme.palette.mode === 'light' ? 'black' : blueGrey[300],
  backgroundColor: 'black',
}));

const LoadingModal: React.FC<any> = () => {
  const isLoading = useSelector((redux: RootState) => redux.app.loading);
  return (
    <Modal sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} open={isLoading}>
      <StyledBox>
        <Typography textAlign="center" variant="h4" color="chocolate">
          Loading
        </Typography>
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress color="secondary" size={60} />
        </Box>
      </StyledBox>
    </Modal>
  );
};

export default LoadingModal;
