// chatSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setMessages } from '../Message/MessageSlice';
import { decryptAndMapMessage } from '../../Utils/convertMessage';
import { RootState } from '../../Redux/store';

interface ChatSlice {
  roomName: string;
  enigma: string;
  nickName: string;
  saveOnLocalStorage: boolean;
}

const initialState: ChatSlice = {
  roomName: '',
  enigma: localStorage.getItem('enigma') || '',
  nickName: localStorage.getItem('nickName') || '',
  saveOnLocalStorage: localStorage.getItem('saveOnLocalStorage') === 'true',
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
    setRoomName: (state, action: PayloadAction<string>) => {
      state.roomName = action.payload;
    },
    toggleSaveOnLocalStorage: (state) => {
      state.saveOnLocalStorage = !state.saveOnLocalStorage;
      localStorage.setItem('saveOnLocalStorage', state.saveOnLocalStorage.toString());
      if (!state.saveOnLocalStorage) {
        localStorage.removeItem('enigma');
        localStorage.removeItem('nickName');
      } else {
        localStorage.setItem('enigma', state.enigma);
        localStorage.setItem('nickName', state.nickName);
      }
    },
  },
});

export const { setEnigma, setNickName, setRoomName, toggleSaveOnLocalStorage } = chatSlice.actions;

export default chatSlice.reducer;

export const updateEnigma = createAsyncThunk('chat/updateEnigma', async (newEnigma: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setEnigma(newEnigma));
    const currentState: RootState = thunkAPI.getState() as RootState;
    const updatedMessages = updateMessages(currentState);
    thunkAPI.dispatch(setMessages(updatedMessages));
    if (currentState.chat.saveOnLocalStorage) {
      localStorage.setItem('enigma', newEnigma);
    }
  } catch (error) {
    console.error(error);
  }
});
export const updateNickName = createAsyncThunk('chat/updateNickName', async (nickName: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setNickName(nickName));
    const currentState: RootState = thunkAPI.getState() as RootState;
    const updatedMessages = updateMessages(currentState);
    thunkAPI.dispatch(setMessages(updatedMessages));
    if (currentState.chat.saveOnLocalStorage) {
      localStorage.setItem('nickName', nickName);
    }
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
