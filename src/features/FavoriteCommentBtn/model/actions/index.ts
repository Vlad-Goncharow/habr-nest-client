import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchModalActions } from "entities/FetchModal";
import { userActions } from "entities/User";
import axios from '../../../../axios';

export const addFavoriteComment = createAsyncThunk(
  'user/addFavoriteComment',
  async (commentId: number, {  dispatch }) => {
    try {
      const { data } = await axios.post(`/users/favorites/comment/add/${commentId}`)
      if (data.success) {
        dispatch(userActions.addFavoriteComment({ id: commentId }));
        return true;
      }
    } catch (e) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При подписке произошла ошибка!' }));
      return false;
    }
  }
);

export const removeFavoriteComment = createAsyncThunk(
  'user/removeFavoriteComment',
  async (commentId: number, { dispatch }) => {
    try {
      const { data } = await axios.delete(`/users/favorites/comment/delete/${commentId}`)
      if (data.success) {
        dispatch(userActions.removeFavoriteComment({ id: commentId }));
        return true;
      }
    } catch (e) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При отписке произошла ошибка!' }));
      return false;
    }
  }
);