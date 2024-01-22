import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const HomeButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    navigate('/lobby');
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleHomeClick}>
        <HomeIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Confirm Navigation'}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>Do you want to go back to the lobby?</DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="outlined" onClick={handleConfirm} color="success" autoFocus>
            Accept
          </Button>
          <Button variant="outlined" onClick={handleClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HomeButton;
