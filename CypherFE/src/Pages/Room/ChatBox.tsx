import React, { useCallback, useState } from 'react';
import { Box, Button, Grid, List, styled, TextField, Theme } from '@mui/material';
import { MessageDTO } from '../../Utils/NeoSocket/NeoPackets/Test/MessageDTO';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../Redux/store';
import { HandleContext } from '../../Utils/NeoSocket/NeoSocketLib/Base/HandleContext';
import useHandler from '../../Utils/NeoSocket/CustomHook/useHandler';
import { MessageItem } from './MessageItem';
import { encryptMessage } from '../../Utils/utilsTS';
import { mapDTOToMessage } from '../../Utils/convertMessage';
import { addMessage } from '../../Features/Message/MessageSlice';

const MessagesFrame = styled(Box)(({ theme }: { theme: Theme }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? 'orange' : theme.palette.primary.light,
  overflowY: 'scroll',
  height: '85%',
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

const ChatFormFrame = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  bottom: 0,
  marginTop: 10,
}));

const ChatBox: React.FC = () => {
  const messages = useSelector((redux: RootState) => redux.messages.messages);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const { client, isConnected } = useSelector((redux: RootState) => redux.neosocket);
  const { enigma, nickName } = useSelector((redux: RootState) => redux.chat);

  const handleReceiveMessage = useCallback(
    (packet: MessageDTO, context: HandleContext) => {
      const newMessage = mapDTOToMessage(packet, enigma, nickName);
      dispatch(addMessage(newMessage));
    },
    [enigma, nickName],
  );
  useHandler(MessageDTO, handleReceiveMessage);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const encodedChatContent = encryptMessage(input, enigma);
      const encodedUserName = encryptMessage(nickName, enigma);
      const newMessage: MessageDTO = new MessageDTO();
      newMessage.UserName = encodedUserName;
      newMessage.Content = encodedChatContent;
      // setMessages([...messages, newMessage]);
      setInput('');
      client?.command(newMessage);
    }
  };

  return (
    <>
      <MessagesFrame>
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
                  }}
                >
                  <MessageItem message={message} />
                </Box>
              ),
          )}
        </List>
      </MessagesFrame>
      <ChatFormFrame>
        <form onSubmit={(e: React.FormEvent) => handleSend(e)} style={{ width: '100%' }}>
          <Grid container sx={{ height: 40 }}>
            <Grid item xs={9}>
              <TextField fullWidth variant="outlined" value={input} onChange={handleInputChange} placeholder="Type a message" />
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={2.5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button type={'submit'} variant="contained" color="primary" fullWidth sx={{ height: '100%', borderRadius: 5 }}>
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </ChatFormFrame>
    </>
  );
};

export default ChatBox;
