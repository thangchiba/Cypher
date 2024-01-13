import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const ChatItem: React.FC<Message> = (message) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.isSender ? 'flex-end' : 'flex-start',
        mb: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          padding: '8px',
          borderRadius: '10px',
          backgroundColor: message.isSender ? '#blue' : '#gray',
          color: 'white',
          textAlign: 'left',
        }}
      >
        <Typography variant="body1">{message.Content}</Typography>
      </Box>
    </Box>
  );
};
