import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../../axios';
import { FormLogin, FormRegister, AuthRegisterError, AuthLoginError, AuthResponse, userStateSchema } from "../types/user";

const initialState: userStateSchema = {
  user: null,
  isLoading:false
}

export const fetchAuth = createAsyncThunk('auth/fetchAuth',
  async () => {
    const { data } = await axios.post('/auth/refresh')
    return data
  }
)

export const fetchRegister = createAsyncThunk<AuthResponse, FormRegister, { rejectValue: AuthRegisterError }>('auth/fetchRegister',
  async (params: FormRegister, { rejectWithValue }) => {
    try {
      const {data} = await axios.post('/auth/registration', params)
      return data
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
)

export const fetchLogin = createAsyncThunk<AuthResponse, FormLogin, { rejectValue: AuthLoginError }>('auth/fetchLogin',
  async (params: FormLogin, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', params)
      return data
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }      
      return rejectWithValue(err.response.data);
    }
  }
)

export const fetchLogout = createAsyncThunk('auth/fetchLogout',
  async () => {
    try {
      const { data } = await axios.post('/auth/logout')
      localStorage.removeItem('token')
      return data
    } catch (e) {
      throw e;
    }
  }
)

export const fetchUpdateUser = createAsyncThunk('user/fetchUpdateUser',
  async (params: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/auth/profile-update`, params)
      return data
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSubscribe(state, action){
      if(state.user){
        state.user?.subscriptions.push(action.payload)
      }
    },
    userUnSubscribe(state, action) {
      if(state.user){
        state.user.subscriptions = state.user.subscriptions.filter((el) => el.id !== action.payload.id);
      }
    },

    userHabSubscribe(state, action) {
      if (state.user) {
        state.user?.habSubscribers.push(action.payload)
      }
    },
    userHabUnSubscribe(state, action) {
      if (state.user) {
        state.user.habSubscribers = state.user.habSubscribers.filter((el) => el.id !== action.payload.id);
      }
    }
  },
  extraReducers(builder) {
    //refresh
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
    //register
    builder.addCase(fetchRegister.pending,(state) => {
      state.isLoading = true
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      if (action.payload){
        state.user = action.payload.user
        state.isLoading = false
      }
    })
    builder.addCase(fetchRegister.rejected, (state) => {
      state.user = null
      state.isLoading = false
    })
    //login
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
    //logout
    builder.addCase(fetchLogout.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.isLoading = false
        state.user = null
      }
    })
    //updata
    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      if (action.payload && state.user !== null) {
        state.user = {
          ...state.user,
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

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;