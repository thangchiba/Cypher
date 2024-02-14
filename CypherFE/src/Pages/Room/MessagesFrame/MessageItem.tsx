import { Stack, styled, Typography } from '@mui/material';
import { ListItemProps } from '@mui/material/ListItem';
import { Box } from '@mui/system';
import { formatDateToCustomString } from '../../../Utils/dateConvert';

// Extend the ListItemProps type to include the isSender prop
interface StyledMessageItemProps extends ListItemProps {
  isSender: boolean;
}

const StyledMessageItem = styled(Stack)<StyledMessageItemProps>(({ theme, isSender }) => ({
  alignItems: isSender ? 'flex-end' : 'flex-start',
  width: '100%',
}));

const StyledMessageContent = styled(Box)<StyledMessageItemProps>(({ theme, isSender }) => ({
  maxWidth: '70%',
  display: 'inline-block',
  width: 'fit-content',
  height: '100%',
  backgroundColor: isSender ? (theme.palette.mode === 'dark' ? 'darkorange' : 'lightblue') : theme.palette.mode === 'dark' ? 'darkgrey' : 'lightgrey',
  '& .MuiListItemText-root': {
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
  padding: '5px 10px',
  borderRadius: '10px',
  textAlign: 'left',
}));
const StyledMessageHeader = styled(Box)(({ theme }) => ({
  marginBotton: '1px',
  fontSize: '0.8rem',
}));

// MessageItem component
export const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <>
      <StyledMessageItem isSender={message.isSender}>
        <StyledMessageHeader>
          {!message.isSender ? `${message.DecodedUserName || 'Anonymous'} - ` : ``}
          {formatDateToCustomString(message.CreatedAt)}
        </StyledMessageHeader>
        <StyledMessageContent isSender={message.isSender}>
          <Typography>{message.DecodedContent}</Typography>
        </StyledMessageContent>
      </StyledMessageItem>
    </>
  );
};
