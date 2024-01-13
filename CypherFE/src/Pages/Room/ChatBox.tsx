import React, { useCallback, useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { MessageDTO } from '../../Utils/NeoSocket/NeoPackets/Test/MessageDTO';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { HandleContext } from '../../Utils/NeoSocket/NeoSocketLib/Base/HandleContext';
import useHandler from '../../Utils/NeoSocket/CustomHook/useHandler';

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

  const handleSend = () => {
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
    <Box>
      <List>
        {messages.map((message, index) => (
          <ListItem key={`message${index}`}>
            <ListItemText primary={message.Content} />
          </ListItem>
        ))}
      </List>
      <TextField fullWidth variant="outlined" value={input} onChange={handleInputChange} placeholder="Type a message" />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default ChatBox;
