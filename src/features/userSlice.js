import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_LINK } from '../utils/Constant.js';
// import Swal from 'sweetalert2';
const initialState = {
  value: null,
  user: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    code: '',
  },
  status: 'idle',
  error: null,
  token: null,
};
// Login Method
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_LINK}users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data;
      // console.log(user);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (
    { name, email, password, confirmPassword, country },
    { rejectWithValue }
  ) => {
    try {
      console.log('123');
      const response = await axios.post(
        `${API_LINK}users/signUp`,
        {
          name,
          email,
          password,
          confirmPassword,
          country,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassowrd',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_LINK}users//forgotPassword`,
        {
          email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ token, password, confirmPassword }, { rejectWithValue }) => {
    try {
      console.log(token);
      const response = await axios.patch(
        `${API_LINK}users/resetPassword`,
        {
          password,
          confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyCode = createAsyncThunk(
  'user/verifyCode',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_LINK}users/verifyCode`,
        {
          email,
          code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (token) => {
  try {
    const response = await axios.post(`${API_LINK}logout`, null, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // sessionStorage.clear();
    // localStorage.clear();
    return response.data;
  } catch (error) {
    // throw error.response.data;
    if (error.response.data.message === 'Unauthenticated.') {
      sessionStorage.clear();
      localStorage.clear();
    }
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.value = false;
        state.user = { name: '', email: '', password: '' };
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.value = false;
        state.user = { name: '', email: '', password: '' };
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.value = false;
        state.user = { name: '', email: '', password: '' };
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(verifyCode.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.status = 'succeeded';
        state.value = false;
        state.token = action.payload.data;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;
export default userSlice.reducer;
