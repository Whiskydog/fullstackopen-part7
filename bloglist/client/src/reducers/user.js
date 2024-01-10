import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import loginService from '../services/login';
import { notify } from './notification';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userLoaded: (state, action) => action.payload,
    userLoggedOff: () => null,
    userLoggedIn: (state, action) => action.payload,
  },
});

const { userLoaded, userLoggedOff, userLoggedIn } = userSlice.actions;

export const loadUser = () => (dispatch) => {
  const userFromStorage = window.localStorage.getItem('user');
  if (userFromStorage) {
    const user = JSON.parse(userFromStorage);
    dispatch(userLoaded(user));
    blogsService.setToken(user.token);
  }
};

export const logInUser = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login(username, password);
    dispatch(userLoggedIn(user));
    blogsService.setToken(user.token);
    window.localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    dispatch(notify('error', error.response.data.error));
  }
};

export const logOffUser = () => (dispatch) => {
  window.localStorage.removeItem('user');
  dispatch(userLoggedOff());
};

export default userSlice.reducer;
