import React, { useCallback } from 'react';
import { Box, List, styled, Theme } from '@mui/material';
import { MessageItem } from './MessageItem';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../Redux/store';
import { HandleContext } from '../../../Utils/NeoSocket/NeoSocketLib/Base/HandleContext';
import useHandler from '../../../Utils/NeoSocket/CustomHook/useHandler';
import { mapDTOToMessage } from '../../../Utils/convertMessage';
import { addMessage } from '../../../Features/Message/MessageSlice';
import useScroll from '../useScroll';
import { MessageDTO } from '../../../Utils/NeoSocket/NeoPackets/Test/MessageDTO';

const StyledMessagesFrame = styled(Box)(({ theme }: { theme: Theme }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? 'orange' : theme.palette.primary.light,
  overflowY: 'scroll',
  // overFlowX: 'hidden',
  height: '84%',
  display: 'flex',
  flexDirection: 'column-reverse',
  // Hide scrollbar for Chrome, Safari and other WebKit browsers
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  // Hide scrollbar for Firefox
  scrollbarWidth: 'none',
  // Optional: for Internet Explorer and Edge
  '-ms-overflow-style': 'none',
}));

function MessagesFrame() {
  const dispatch = useAppDispatch();
  const { enigma, nickName } = useSelector((redux: RootState) => redux.chat);
  const messages = useSelector((redux: RootState) => redux.messages.messages);
  const { messagesEndRef } = useScroll();
  const handleReceiveMessage = useCallback(
    (packet: MessageDTO, context: HandleContext) => {
      const newMessage = mapDTOToMessage(packet, enigma, nickName);
      dispatch(addMessage(newMessage));
    },
    [enigma, nickName, dispatch],
  );
  useHandler(MessageDTO, handleReceiveMessage);
  return (
    <StyledMessagesFrame>
      <List>
        {messages.map(
          (message, index) =>
            message.DecodedContent && (
              <Box
                key={`message${index}`}
                sx={{
                  paddingInline: 0,
                  display: 'flex',
                  justifyContent: message.isSender ? 'flex-end' : 'flex-start',
                  mt: 1,
                }}
              >
                <MessageItem message={message} />
              </Box>
            ),
        )}
        <div ref={messagesEndRef} />
      </List>
    </StyledMessagesFrame>
  );
}

export default MessagesFrame;
