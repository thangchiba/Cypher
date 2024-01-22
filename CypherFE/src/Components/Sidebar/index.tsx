import React from 'react';
import { Divider, Drawer, Stack, Typography } from '@mui/material';
import EnigmaTextField from '../Setup/EnigmaTextField';
import NickNameTextField from '../Setup/NickNameTextField';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../Redux/store';
import { setOpenSetting } from '../../Features/App/AppSlice';

type SidebarProps = {
  // open: boolean;
  // onClose: () => void;
};

const Index: React.FC<SidebarProps> = (props) => {
  const open = useSelector((state: RootState) => state.app.openSetting);
  const dispatch = useAppDispatch();

  function onClose() {
    dispatch(setOpenSetting(!open));
  }

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
