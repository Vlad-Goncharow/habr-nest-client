import { createSlice } from '@reduxjs/toolkit'
import { modalInitialState } from '../types'

const initialState: modalInitialState = {
  type: null,
  visible: false,
  content: '',
}

const fetchModalSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    showModal(state, action) {
      state.visible = true
      state.type = action.payload.type
      state.content = action.payload.content
    },
    hideModal(state) {
      state.visible = false
      state.type = null
      state.content = ''
    },
  },
})

export const { actions: fetchModalActions } = fetchModalSlice
export const { reducer: fetchModalReducer } = fetchModalSlice
