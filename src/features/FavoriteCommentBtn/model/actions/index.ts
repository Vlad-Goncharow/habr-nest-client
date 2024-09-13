import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchModalActions } from 'entities/FetchModal'
import { userActions } from 'entities/User'
import axios from '../../../../axios'
import i18next from 'i18next'

export const addFavoriteComment = createAsyncThunk(
  'user/addFavoriteComment',
  async (commentId: number, { dispatch }) => {
    try {
      const { data } = await axios.post(
        `/users/favorites/comment/add/${commentId}`
      )
      if (data.success) {
        dispatch(userActions.addFavoriteComment({ id: commentId }))
        return true
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: i18next.t('addFavorite'),
        })
      )
      return false
    }
  }
)

export const removeFavoriteComment = createAsyncThunk(
  'user/removeFavoriteComment',
  async (commentId: number, { dispatch }) => {
    try {
      const { data } = await axios.delete(
        `/users/favorites/comment/delete/${commentId}`
      )
      if (data.success) {
        dispatch(userActions.removeFavoriteComment({ id: commentId }))
        return true
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: i18next.t('removeFavorite'),
        })
      )
      return false
    }
  }
)
