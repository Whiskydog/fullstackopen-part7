import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import { notify } from './notification';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    blogsLoaded: (state, action) => action.payload,
    blogAdded: (state, action) => state.concat(action.payload),
  },
});

export const loadBlogs = () => async (dispatch) => {
  const blogs = await blogsService.getAll();
  dispatch(blogsLoaded(blogs));
};

export const addBlog = (blogData) => async (dispatch) => {
  try {
    const blog = await blogsService.create(blogData);
    dispatch(blogAdded(blog));
    dispatch(notify('success', `A new blog ${blog.title} added`));
  } catch (error) {
    dispatch(notify('error', error.response.data.error));
  }
};

export const { blogAdded, blogsLoaded } = blogsSlice.actions;
export default blogsSlice.reducer;
