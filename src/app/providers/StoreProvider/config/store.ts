import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { fetchModalReducer } from 'entities/FetchModal'
import { userReducer } from 'entities/User'

//I know that exporting to layers below is a violation of fsd principles, but they haven't figured out how to solve it themselves yet
export const rootReducer = combineReducers({
  user: userReducer,
  fetchModal: fetchModalReducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: false,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
