// Styled component for message item
import { ListItem, ListItemText, styled } from '@mui/material';

const StyledMessageItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '10px',
  marginTop: 1,
  width: '80%',
  backgroundColor: theme.palette.mode === 'dark' ? 'darkgrey' : 'lightgrey',
  '& .MuiListItemText-root': {
    wordBreak: 'break-word', // Breaks long words to prevent overflow
    whiteSpace: 'normal', // Ensures normal text wrapping
  },
}));
// const StyledMessageItem = styled(ListItem)(({ theme }) => ({
//   borderRadius: '10px',
//   marginTop: 1,
//   width: '80%',
//   backgroundColor: theme.palette.mode === 'dark' ? 'darkorange' : 'lightblue',
//   '& .MuiListItemText-root': {
//     wordBreak: 'break-word', // Breaks long words to prevent overflow
//     whiteSpace: 'normal', // Ensures normal text wrapping
//   },
// }));

// MessageItem component
export const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <StyledMessageItem>
      <ListItemText primary={message.Content} />
    </StyledMessageItem>
  );
};
