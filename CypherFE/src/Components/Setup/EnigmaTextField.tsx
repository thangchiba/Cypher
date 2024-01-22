import { RootState, useAppDispatch } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { updateEnigma } from '../../Features/Chat/ChatSlice';

function EnigmaTextField() {
  const enigma = useSelector((redux: RootState) => redux.chat.enigma);
  const dispatch = useAppDispatch();

  function handleChangeEnigma(e: ChangeEvent<HTMLInputElement>) {
    dispatch(updateEnigma(e.target.value));
  }

  return (
    <TextField
      fullWidth
      label="Enigma Code"
      placeholder={'Enter encode text here'}
      value={enigma}
      InputLabelProps={{ shrink: true }}
      onChange={handleChangeEnigma}
      // helperText={'Notice : users need same code to be decrypt have meaning message'}
    ></TextField>
  );
}

export default EnigmaTextField;
