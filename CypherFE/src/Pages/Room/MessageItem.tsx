import { styled } from '@mui/material';
import { ListItemProps } from '@mui/material/ListItem';
import { Box } from '@mui/system';
import { formatDateToCustomString } from '../../Utils/dateConvert';

// Extend the ListItemProps type to include the isSender prop
interface StyledMessageItemProps extends ListItemProps {
  isSender: boolean;
}

const StyledMessageItem = styled(Box)<StyledMessageItemProps>(({ theme, isSender }) => ({
  // marginTop: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  width: '60%',
}));

const StyledContentBox = styled(Box)<StyledMessageItemProps>(({ theme, isSender }) => ({
  height: '100%',
  backgroundColor: isSender ? (theme.palette.mode === 'dark' ? 'darkorange' : 'lightblue') : theme.palette.mode === 'dark' ? 'darkgrey' : 'lightgrey',
  '& .MuiListItemText-root': {
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
  padding: '5px 10px',
  borderRadius: '10px',
}));

// MessageItem component
export const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <>
      <StyledMessageItem isSender={message.isSender}>
        <div style={{ marginBottom: '1px', textAlign: message.isSender ? 'right' : 'left' }}>
          {!message.isSender ? `${message.DecodedUserName} - ` : ``}
          {formatDateToCustomString(message.CreatedAt)}
        </div>
        <StyledContentBox isSender={message.isSender}>{message.DecodedContent}</StyledContentBox>
      </StyledMessageItem>
    </>
  );
};
