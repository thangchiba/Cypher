import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Grid, List, ListItem, styled, TextField, Theme } from '@mui/material';
import { MessageDTO } from '../../Utils/NeoSocket/NeoPackets/Test/MessageDTO';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { HandleContext } from '../../Utils/NeoSocket/NeoSocketLib/Base/HandleContext';
import useHandler from '../../Utils/NeoSocket/CustomHook/useHandler';
import { MessageItem } from './MessageItem';
import { decryptMessage, encryptMessage } from '../../Utils/utilsTS';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { client, isConnecting } = useSelector((redux: RootState) => redux.neosocket);
  const { enigma, nickName } = useSelector((redux: RootState) => redux.chat);

  const handleReceiveMessage = useCallback(
    (packet: MessageDTO, context: HandleContext) => {
      console.log('Handled meesage : ', packet);
      // const decodedChatContent = decryptMessage(packet.Content, enigma);
      const handleMessage: Message = {
        UserName: packet.UserName,
        Content: packet.Content,
        DecodedContent: decryptMessage(packet.Content, enigma),
        isSender: packet.UserName === nickName,
      };
      setMessages((prevState) => [...prevState, handleMessage]);
    },
    [enigma, nickName],
  );
  useHandler(MessageDTO, handleReceiveMessage);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    // Create a new array of messages with decrypted content
    console.log('redecode');
    const decryptedMessages = messages.map((message) => {
      const decryptedMessage = decryptMessage(message.Content, enigma);
      console.log({ decryptedMessage });
      return {
        ...message,
        DecodedContent: decryptedMessage,
      };
    });
    console.log(decryptedMessages);

    // Update the state with the new array of decrypted messages
    setMessages(decryptedMessages);
  }, [enigma]);

  useEffect(() => {
    const newMessages = messages.map((message) => {
      const isSender = message.UserName === nickName;
      return {
        ...message,
        isSender,
      };
    });
    setMessages(newMessages);
  }, [nickName]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const encodedChatContent = encryptMessage(input, enigma);
      const newMessage: MessageDTO = new MessageDTO();
      newMessage.UserName = nickName;
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
                <ListItem
                  key={`message${index}`}
                  sx={{
                    paddingInline: 0,
                    display: 'flex',
                    justifyContent: message.isSender ? 'flex-end' : 'flex-start',
                  }}
                >
                  <MessageItem message={message} />
                </ListItem>
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
