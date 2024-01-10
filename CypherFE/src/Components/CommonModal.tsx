import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { ReactNode } from 'react';
import { Modal } from '@mui/material';

interface CommonModalProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onClose?: () => void;
  closeButton?: boolean;
  closeWhenClickOutside?: boolean;
  children?: ReactNode;
}

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  // backgroundColor: 'white',
  minWidth: 350,
  maxHeight: '75vh',
  borderRadius: 20,
  padding: 10,
  overflow: 'scroll',
  [theme.breakpoints.down('md')]: {
    minWidth: 350,
    maxWidth: 400,
  },
}));

const CommonModal: React.FC<CommonModalProps> = (props) => {
  const { open = false, setOpen, onClose, closeButton = true, closeWhenClickOutside = true, children } = props;

  function closeModal() {
    if (setOpen) setOpen(false);
    if (onClose) onClose();
  }

  return (
    <Modal
      open={open}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onBackdropClick={closeWhenClickOutside ? closeModal : undefined}
      {...props}
    >
      <StyledBox>
        <Box display="flex" justifyContent="end" style={{ position: 'absolute', right: 10 }}>
          {closeButton && <CloseOutlinedIcon fontSize="large" onClick={closeModal} cursor="pointer" />}
        </Box>
        {children}
      </StyledBox>
    </Modal>
  );
};

export default CommonModal;
