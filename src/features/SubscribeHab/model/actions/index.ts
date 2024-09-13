import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../../axios'
import { userActions } from 'entities/User'
import { fetchModalActions } from 'entities/FetchModal'
import { RootState } from 'app/providers/StoreProvider'
import i18next from 'i18next'

export const subscribeToHab = createAsyncThunk(
  'user/subscribeToHab',
  async (habId: number, { getState, dispatch }) => {
    const state = getState() as RootState
    const { user } = state.user
    try {
      const { data } = await axios.post('/habs/subscribe', {
        userId: user?.id,
        habId,
      })
      if (data.success) {
        dispatch(userActions.userHabSubscribe({ id: habId }))
        return true
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: i18next.t('subcribeError'),
        })
      )
      return false
    }
  }
)

export const unsubscribeFromHab = createAsyncThunk(
  'user/unsubscribeFromHab',
  async (habId: number, { getState, dispatch }) => {
    const state = getState() as RootState
    const { user } = state.user
    try {
      const { data } = await axios.post('/habs/unsubscribe', {
        userId: user?.id,
        habId,
      })
      if (data.success) {
        dispatch(userActions.userHabUnSubscribe({ id: habId }))
        return true
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: i18next.t('unSubcribeError'),
        })
      )
      return false
    }
  }
)
