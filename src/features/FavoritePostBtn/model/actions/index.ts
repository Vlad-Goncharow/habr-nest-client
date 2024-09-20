import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchModalActions } from 'entities/FetchModal'
import { userActions } from 'entities/User'
import axios from '../../../../axios'
import i18next from 'i18next'

export const addFavoritePost = createAsyncThunk(
  'user/addFavoritePost',
  async (postId: number, { dispatch }) => {
    try {
      const { data } = await axios.post(`/users/favorites/post/add/${postId}`)
      if (data.success) {
        dispatch(userActions.addFavoritePost({ id: postId }))
        return true
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: i18next.t('addFavoriteError'),
        })
      )
      return false
    }
  }
)

export const removeFavoritePost = createAsyncThunk(
  'user/removeFavoritePost',
  async (postId: number, { dispatch }) => {
    try {
      const { data } = await axios.delete(
        `/users/favorites/post/delete/${postId}`
      )
      if (data.success) {
        dispatch(userActions.removeFavoritePost({ id: postId }))
        return true
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: i18next.t('removeFavoriteError'),
        })
      )
      return false
    }
  }
)
