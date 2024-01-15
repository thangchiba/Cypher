// chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
