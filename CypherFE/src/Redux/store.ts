import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import appReducer from '../Features/App/AppSlice';
import chatReducer from '../Features/Chat/ChatSlice';
import themeReducer from '../Features/Theme/ThemeSlice';
import NSReducer from '../Features/NeoSocket/NeoSocketSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    app: appReducer,
    chat: chatReducer,
    theme: themeReducer,
    neosocket: NSReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch<ThunkDispatch<any, any, any>>;
// const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
