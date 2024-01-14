import React, { useCallback, useState } from 'react';
import { Box, Button, Grid, List, ListItem, styled, TextField, Theme } from '@mui/material';
import { MessageDTO } from '../../Utils/NeoSocket/NeoPackets/Test/MessageDTO';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { HandleContext } from '../../Utils/NeoSocket/NeoSocketLib/Base/HandleContext';
import useHandler from '../../Utils/NeoSocket/CustomHook/useHandler';
import { MessageItem } from './MessageItem';

const MessagesFrame = styled(Box)(({ theme }: { theme: Theme }) => ({
  borderBlock: '1px solid orange',
  overflowY: 'scroll',
  height: '70%',
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { client, isConnecting } = useSelector((redux: RootState) => redux.neosocket);

  const handleReceiveMessage = useCallback((packet: MessageDTO, context: HandleContext) => {
    console.log('Handled meesage : ', packet);
    const handleMessage: Message = { Content: packet.Content, UserName: packet.UserName, isSender: true };
    setMessages((prevState) => [...prevState, handleMessage]);
  }, []);
  useHandler(MessageDTO, handleReceiveMessage);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: MessageDTO = new MessageDTO();
      newMessage.UserName = 'ThangChiba';
      newMessage.Content = input;
      // setMessages([...messages, newMessage]);
      setInput('');
      client?.command(newMessage);
    }
  };

  return (
    <>
      <MessagesFrame>
        <List>
          {messages.map((message, index) => (
            <ListItem key={`message${index}`} sx={{ paddingInline: 0 }}>
              <MessageItem message={message} />
            </ListItem>
          ))}
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
