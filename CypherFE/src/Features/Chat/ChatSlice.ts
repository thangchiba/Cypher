// chatSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setMessages } from '../Message/MessageSlice';
import { decryptAndMapMessage } from '../../Utils/convertMessage';

interface ChatSlice {
  enigma: string;
  nickName: string;
}

const initialState: ChatSlice = {
  enigma: '',
  nickName: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setEnigma: (state, action: PayloadAction<string>) => {
      state.enigma = action.payload;
    },
    setNickName: (state, action: PayloadAction<string>) => {
      state.nickName = action.payload;
    },
  },
});

export const { setEnigma, setNickName } = chatSlice.actions;

export default chatSlice.reducer;

export const updateEnigma = createAsyncThunk('chat/updateEnigma', async (newEnigma: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setEnigma(newEnigma));
    const currentState = thunkAPI.getState();
    const updatedMessages = updateMessages(currentState);
    thunkAPI.dispatch(setMessages(updatedMessages));
  } catch (error) {
    console.error(error);
  }
});
export const updateNickName = createAsyncThunk('chat/updateNickName', async (nickName: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setNickName(nickName));
    const currentState = thunkAPI.getState();
    const updatedMessages = updateMessages(currentState);
    thunkAPI.dispatch(setMessages(updatedMessages));
  } catch (error) {
    console.error(error);
  }
});

// Helper function to get updated messages
function updateMessages(currentState: any): Message[] {
  const messages = currentState.messages.messages;
  const nickName = currentState.chat.nickName;
  const enigma = currentState.chat.enigma;
  return messages.map((message: Message) => {
    return decryptAndMapMessage(message, enigma, nickName);
  });
}
