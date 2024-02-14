import React from 'react';
import { SvgIconProps, Tooltip } from '@mui/material';
import OnlineIcon from '@mui/icons-material/FiberManualRecord';
import OfflineIcon from '@mui/icons-material/PortableWifiOff';
import BusyIcon from '@mui/icons-material/DoNotDisturb';

interface ChatStatusIconProps {
  status: 'online' | 'offline' | 'busy';
}

const ChatStatusIcon: React.FC<ChatStatusIconProps> = ({ status }) => {
  const getIcon = (status: ChatStatusIconProps['status']): React.ReactElement<SvgIconProps> => {
    switch (status) {
      case 'online':
        return <OnlineIcon style={{ color: 'green' }} />;
      case 'offline':
        return <OfflineIcon style={{ color: 'gray' }} />;
      case 'busy':
        return <BusyIcon style={{ color: 'red' }} />;
      default:
        return <OfflineIcon style={{ color: 'gray' }} />;
    }
  };

  return <Tooltip title={status.charAt(0).toUpperCase() + status.slice(1)}>{getIcon(status)}</Tooltip>;
};

export default ChatStatusIcon;
