import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../Redux/store';
import { toggleSaveOnLocalStorage } from '../../Features/Chat/ChatSlice';
import { Checkbox, FormControlLabel } from '@mui/material';

function SaveOnLocalCB() {
  const saveOnLocalStorage = useSelector((state: RootState) => state.chat.saveOnLocalStorage);
  const dispatch = useAppDispatch();

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(toggleSaveOnLocalStorage());
  }

  return <FormControlLabel control={<Checkbox checked={saveOnLocalStorage} onChange={handleCheckboxChange} />} label="Save on Local Storage" />;
}

export default SaveOnLocalCB;
