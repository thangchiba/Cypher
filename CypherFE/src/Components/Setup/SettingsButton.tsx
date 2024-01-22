import React from 'react';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setOpenSetting } from '../../Features/App/AppSlice';

const SettingsButton: React.FC = () => {
  const openSetting = useSelector((state: RootState) => state.app.openSetting);
  const dispatch = useDispatch();

  const onSettingClick = () => {
    dispatch(setOpenSetting(!openSetting));
  };

  return (
    <IconButton color="inherit" onClick={onSettingClick}>
      <SettingsIcon />
    </IconButton>
  );
};

export default SettingsButton;
