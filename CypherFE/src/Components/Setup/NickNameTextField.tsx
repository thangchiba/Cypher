import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { RootState, useAppDispatch } from '../../Redux/store';
import { updateNickName } from '../../Features/Chat/ChatSlice';

function NickNameTextField() {
  const nickName = useSelector((state: RootState) => state.chat.nickName);
  const dispatch = useAppDispatch();

  function handleChangeNickName(e: ChangeEvent<HTMLInputElement>) {
    dispatch(updateNickName(e.target.value));
  }

  return (
    <TextField
      fullWidth
      label="Nick Name"
      placeholder="Enter nick name here"
      value={nickName}
      InputLabelProps={{ shrink: true }}
      onChange={handleChangeNickName}
    />
  );
}

export default NickNameTextField;
