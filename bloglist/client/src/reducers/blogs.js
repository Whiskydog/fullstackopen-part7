import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import { notify } from './notification';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    blogsLoaded: (state, action) => action.payload,
    blogAdded: (state, action) => state.concat(action.payload),
    blogLiked: (state, action) =>
      state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      ),
    blogRemoved: (state, action) =>
      state.filter((blog) => blog.id !== action.payload),
  },
});

const { blogAdded, blogsLoaded, blogLiked, blogRemoved } = blogsSlice.actions;

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

export const likeBlog = (blog) => async (dispatch) => {
  try {
    const updatedBlog = await blogsService.giveLike(blog);
    dispatch(blogLiked(updatedBlog));
  } catch (error) {
    dispatch(notify('error', error.response.data.error));
  }
};

export const removeBlog = (id) => async (dispatch) => {
  try {
    await blogsService.remove(id);
    dispatch(blogRemoved(id));
  } catch (error) {
    dispatch(notify('error', error.response.data.error));
  }
};

export default blogsSlice.reducer;
