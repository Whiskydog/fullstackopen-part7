import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    usersLoaded: (state, action) => action.payload,
  },
});

const { usersLoaded } = usersSlice.actions;

export const loadUsers = () => async (dispatch) => {
  const users = await usersService.getAll();
  dispatch(usersLoaded(users));
};

export default usersSlice.reducer;
