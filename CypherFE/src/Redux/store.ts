import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../Features/App/AppSlice';
import chatReducer from '../Features/Chat/ChatSlice';
import themeReducer from '../Features/Theme/ThemeSlice';
import NSReducer from '../Features/NeoSocket/NeoSocketSlice';

import rootSaga from './RootSaga';
import createSagaMiddleware from '@redux-saga/core';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    chat: chatReducer,
    theme: themeReducer,
    neosocket: NSReducer,
  },
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
