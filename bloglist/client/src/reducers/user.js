import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import loginService from '../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    userLoaded: (state, action) => {
      state.user = action.payload;
    },
    userLoggedOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'pending';
      state.user = null;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

const { userLoaded, userLoggedOut } = userSlice.actions;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await loginService.login(username, password);
      blogsService.setToken(user.token);
      window.localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const loadUser = () => (dispatch) => {
  const userFromStorage = window.localStorage.getItem('user');
  if (userFromStorage) {
    const user = JSON.parse(userFromStorage);
    blogsService.setToken(user.token);
    dispatch(userLoaded(user));
  }
};

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem('user');
  dispatch(userLoggedOut());
};

export default userSlice.reducer;
