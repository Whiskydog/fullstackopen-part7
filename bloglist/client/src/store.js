import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notification';

const store = configureStore({
  reducer: notificationReducer,
});

export default store;
