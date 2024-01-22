import React from 'react';
import { Divider, Drawer, Stack, Typography } from '@mui/material';
import EnigmaTextField from '../Setup/EnigmaTextField';
import NickNameTextField from '../Setup/NickNameTextField';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const Index: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer
      // variant="persistent"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      // onBackdropClick={onClose}
      anchor="right"
    >
      <Stack spacing={2} sx={{ width: 250, padding: 1 }}>
        <Typography variant="h5" style={{ textAlign: 'center' }}>
          Settings
        </Typography>
        <Divider />
        <EnigmaTextField />
        <Divider />
        <NickNameTextField />
      </Stack>
    </Drawer>
  );
};

export default Index;
