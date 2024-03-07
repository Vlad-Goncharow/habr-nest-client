import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, formLogin, formRegister, userStateSchema } from "../types/user";
import axios from '../../../../axios'

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

export const fetchRegister = createAsyncThunk('auth/fetchRegister',
  async (params: formRegister, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', params)
      return data
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      
      return rejectWithValue(err.response.data);
    }
  }
)

export const fetchLogin = createAsyncThunk('auth/fetchLogin',
  async (params: formLogin, { rejectWithValue }) => {
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

    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
  },
})

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;