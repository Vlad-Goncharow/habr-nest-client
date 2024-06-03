import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { userActions } from 'entities/User';
import { fetchModalActions } from 'entities/FetchModal';

export const subscribeUser = createAsyncThunk(
  'user/subscribeUser',
  async (userId: number, { dispatch }) => {
    try {
      const { data } = await axios.post(`/users/subscribe/${userId}`);
      if (data.success === true) {
        dispatch(userActions.userSubscribe({ id: userId }));
        return true;
      }
    } catch (e) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При подписке произошла ошибка!' }));
      return false;
    }
  }
);

export const unsubscribeUser = createAsyncThunk(
  'user/unsubscribeUser',
  async (userId: number, { dispatch }) => {
    try {
      const { data } = await axios.post(`/users/unsubscribe/${userId}`);
      if (data.success === true) {
        dispatch(userActions.userUnSubscribe({ id: userId }));
        return true;
      }
    } catch (e) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При отписке произошла ошибка!' }));
      return false;
    }
  }
);