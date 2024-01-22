import React from 'react';
import { Box } from '@mui/system';

const NeonAvatar: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const pulseAnimation = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    // boxShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FFA500',
    boxShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #00e1ff',
    animation: 'pulse 2s ease-out infinite',
  };

  return (
    <div style={{ position: 'relative', width: '150px', height: '150px' }}>
      <img src={imageUrl} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
      <Box sx={pulseAnimation} />
    </div>
  );
};

export default NeonAvatar;
