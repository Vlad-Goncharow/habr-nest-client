import { createSlice } from '@reduxjs/toolkit'
import {
  fetchAuth,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUpdateUser,
} from '../thunks'
import { userStateSchema } from '../types/user'

const initialState: userStateSchema = {
  user: null,
  isLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSubscribe(state, action) {
      if (state.user) {
        state.user?.subscriptions.push(action.payload)
      }
    },
    userUnSubscribe(state, action) {
      if (state.user) {
        state.user.subscriptions = state.user.subscriptions.filter(
          (el) => el.id !== action.payload.id
        )
      }
    },
    userHabSubscribe(state, action) {
      if (state.user) {
        state.user?.habSubscribers.push(action.payload)
      }
    },
    userHabUnSubscribe(state, action) {
      if (state.user) {
        state.user.habSubscribers = state.user.habSubscribers.filter(
          (el) => el.id !== action.payload.id
        )
      }
    },
    addFavoritePost(state, action) {
      if (state.user) {
        state.user.favoritePosts = [...state.user.favoritePosts, action.payload]
      }
    },
    removeFavoritePost(state, action) {
      if (state.user) {
        state.user.favoritePosts = state.user.favoritePosts.filter(
          (el) => el.id !== action.payload.id
        )
      }
    },
    addFavoriteComment(state, action) {
      if (state.user) {
        state.user.favoriteComments = [
          ...state.user.favoriteComments,
          action.payload,
        ]
      }
    },
    removeFavoriteComment(state, action) {
      if (state.user) {
        state.user.favoriteComments = state.user.favoriteComments.filter(
          (el) => el.id !== action.payload.id
        )
      }
    },
    deleteUser(state) {
      if (state.user) {
        state.user = null
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAuth.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false
        state.user = action.payload.user
      }
    })
    builder.addCase(fetchAuth.rejected, (state) => {
      state.isLoading = false
      state.user = null
    })
    builder.addCase(fetchRegister.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload.user
        state.isLoading = false
      }
    })
    builder.addCase(fetchRegister.rejected, (state) => {
      state.user = null
      state.isLoading = false
    })
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload.user
        state.isLoading = false
      }
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.user = null
      state.isLoading = false
    })
    builder.addCase(fetchLogout.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.isLoading = false
        state.user = null
      }
    })
    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      if (action.payload && state.user !== null) {
        state.user = {
          ...state.user,
          avatar: action.payload.avatar,
          description: action.payload.description,
          fullName: action.payload.fullName,
          gender: action.payload.gender,
          dateOfBirth: action.payload.dateOfBirth,
          country: action.payload.country,
        }
      }
    })
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
