import React, { useState } from 'react';
import { Box, Button, Grid, styled, TextField, Theme } from '@mui/material';
import { RootState } from '../../../Redux/store';
import { useSelector } from 'react-redux';
import { encryptMessage } from '../../../Utils/utilsTS';
import { MessageDTO } from '../../../Utils/NeoSocket/NeoPackets/Test/MessageDTO';
import Client from '../../../API/Client';
import ChatStatusIcon from '../../../Components/ChatStatusIcon';

const StyledChatFormFrame = styled(Box)(({ theme }: { theme: Theme }) => ({
  // position: 'absolute',
  display: 'flex',
  justifyContent: 'flex-end',
  bottom: 0,
  marginTop: 12,
  height: '5%',
}));
const ChatFormFrame = () => {
  const [input, setInput] = useState('');
  const { enigma, nickName } = useSelector((redux: RootState) => redux.chat);
  const { isConnected } = useSelector((redux: RootState) => redux.neosocket);
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
      setInput('');
      Client?.command(newMessage);
    }
  };
  return (
    <StyledChatFormFrame>
      <form onSubmit={(e: React.FormEvent) => handleSend(e)} style={{ width: '100%' }}>
        <Grid container sx={{ height: 40 }}>
          <Grid item xs={9} md={10}>
            <TextField fullWidth variant="outlined" value={input} onChange={handleInputChange} placeholder="Type a message" />
          </Grid>
          <Grid item xs={0.5} display="flex" justifyContent="center" alignItems="center">
            {!isConnected && <ChatStatusIcon status={'offline'} />}
          </Grid>
          <Grid item xs={2.5} md={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button type={'submit'} variant="contained" fullWidth sx={{ height: '100%', borderRadius: 5 }} disabled={!isConnected}>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </StyledChatFormFrame>
  );
};

export default ChatFormFrame;
