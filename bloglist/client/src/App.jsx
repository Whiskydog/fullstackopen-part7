import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from './reducers/notification';
import { loadBlogs } from './reducers/blogs';

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBlogs());
  }, [dispatch]);

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem('user');
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const toggleRef = useRef();

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.giveLike(blog);
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    } catch (error) {
      dispatch(notify('error', error.response.data.error));
    }
  };

  const removeBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;

    try {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (error) {
      dispatch(notify('error', error.response.data.error));
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Please log in</h2>
        <Notification />
        <LoginForm setUser={setUser} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggle label="New blog" ref={toggleRef}>
        <CreateBlogForm toggleRef={toggleRef} />
      </Toggle>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            fromUser={user.username === blog.user.username}
            onLike={() => likeBlog(blog)}
            onRemove={() => removeBlog(blog)}
          />
        ))}
    </div>
  );
};

export default App;
