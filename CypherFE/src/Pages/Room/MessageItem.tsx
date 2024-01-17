import { ListItem, ListItemText, styled } from '@mui/material';
import { ListItemProps } from '@mui/material/ListItem';

// Extend the ListItemProps type to include the isSender prop
interface StyledMessageItemProps extends ListItemProps {
  isSender: boolean;
}

const StyledMessageItem = styled(ListItem)<StyledMessageItemProps>(({ theme, isSender }) => ({
  borderRadius: '10px',
  marginTop: 1,
  width: '60%',
  backgroundColor: isSender ? (theme.palette.mode === 'dark' ? 'darkorange' : 'lightblue') : theme.palette.mode === 'dark' ? 'darkgrey' : 'lightgrey',
  '& .MuiListItemText-root': {
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
  // padding: '0px 10px',
}));

// MessageItem component
export const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <StyledMessageItem isSender={message.isSender}>
      {message.isSender ? '' : message.UserName}
      <ListItemText primary={message.DecodedContent} />
    </StyledMessageItem>
  );
};
