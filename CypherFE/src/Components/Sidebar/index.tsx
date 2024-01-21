import React, { ChangeEvent } from 'react';
import { Divider, Drawer, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../Redux/store';
import { updateEnigma, updateNickName } from '../../Features/Chat/ChatSlice';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const Index: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { enigma, nickName } = useSelector((redux: RootState) => redux.chat);
  const dispatch = useAppDispatch();

  function handleChangeEnigma(e: ChangeEvent<HTMLInputElement>) {
    dispatch(updateEnigma(e.target.value));
  }

  function handleChangeNickName(e: ChangeEvent<HTMLInputElement>) {
    dispatch(updateNickName(e.target.value));
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
        <TextField
          fullWidth
          label="Enigma Code"
          placeholder={'Enter encode text here'}
          value={enigma}
          InputLabelProps={{ shrink: true }}
          onChange={handleChangeEnigma}
          // helperText={'Notice : users need same code to be decrypt have meaning message'}
        ></TextField>
        <Divider />
        <TextField
          fullWidth
          label="Nick Name"
          placeholder={'Enter nick name here'}
          value={nickName}
          InputLabelProps={{ shrink: true }}
          onChange={handleChangeNickName}
        ></TextField>
      </Stack>
    </Drawer>
  );
};

export default Index;
