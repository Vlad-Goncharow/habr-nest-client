import { configureStore } from '@reduxjs/toolkit';
import { fetchModalReducer } from 'entities/FetchModal';
import { userReducer } from 'entities/User';

const store = configureStore({
  reducer: {
    user: userReducer,
    fetchModal: fetchModalReducer
  },
  devTools:false
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;