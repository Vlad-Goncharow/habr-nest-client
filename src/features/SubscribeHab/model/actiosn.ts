import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../axios'
import { userActions } from "entities/User";
import { fetchModalActions } from "entities/FetchModal";
import { RootState } from "app/providers/StoreProvider";

export const subscribeToHab = createAsyncThunk(
  'user/subscribeToHab',
  async (habId: number, { getState, dispatch }) => {
    const state = getState() as RootState; // Явно указываем тип состояния
    const { user } = state.user;
    try {
      const { data } = await axios.post('/habs/subscribe', {
        userId: user?.id,
        habId,
      });
      if (data.success) {
        dispatch(userActions.userHabSubscribe({ id: habId }));
        return true;
      }
    } catch (e) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При подписке произошла ошибка!' }));
      return false;
    }
  }
);

export const unsubscribeFromHab = createAsyncThunk(
  'user/unsubscribeFromHab',
  async (habId: number, { getState, dispatch }) => {
    const state = getState() as RootState; // Явно указываем тип состояния
    const { user } = state.user;
    try {
      const { data } = await axios.post('/habs/unsubscribe', {
        userId: user?.id,
        habId,
      });
      if (data.success) {
        dispatch(userActions.userHabUnSubscribe({ id: habId }));
        return true;
      }
    } catch (e) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При отписке произошла ошибка!' }));
      return false;
    }
  }
);