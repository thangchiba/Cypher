import React from 'react';
import { Box, FormControl, InputLabel, Paper, Stack } from '@mui/material';
import { getRandomColor } from '../../../Utils/utils';

interface FloatingLabelBoxProp {
  label: string;
  children: React.ReactNode; // Better type definition for children
}

const FloatingLabelBox: React.FC<FloatingLabelBoxProp> = ({ label, children }) => {
  // Custom styles for the FormControl
  const customStyle = {
    borderColor: getRandomColor(), // Random border color
    backgroundColor: 'inherit', // Inherit background color from parent
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: 3,
    margin: 3,
    gap: 2,
  };

  return (
    <FormControl variant="outlined" component={Paper} elevation={1} fullWidth style={customStyle}>
      <InputLabel shrink sx={{ fontWeight: 700 }}>
        {label}
      </InputLabel>
      <Box sx={{ padding: 1 }}>{children}</Box>
    </FormControl>
  );
};

export default FloatingLabelBox;
