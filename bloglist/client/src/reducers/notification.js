import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { type: '', content: '', visible: false },
  reducers: {
    showError: (state, action) => {
      state.type = 'error';
      state.content = action.payload || 'There was an unexpected error';
      state.visible = true;
    },
    showSuccess: (state, action) => {
      state.type = 'success';
      state.content = action.payload;
      state.visible = true;
    },
    hide: (state) => {
      state.type = '';
      state.content = '';
      state.visible = false;
    },
  },
});

let timeoutId;
export const notify =
  (type, content, secs = 3) =>
  (dispatch) => {
    if (timeoutId) clearTimeout(timeoutId);
    type === 'error'
      ? dispatch(showError(content))
      : dispatch(showSuccess(content));
    timeoutId = setTimeout(() => dispatch(hide()), secs * 1000);
  };

export const { showError, showSuccess, hide } = notificationSlice.actions;
export default notificationSlice.reducer;
