import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { loadBlogs } from './reducers/blogs';
import { loadUser, logOffUser } from './reducers/user';

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBlogs());
    dispatch(loadUser());
  }, [dispatch]);

  const toggleRef = useRef();

  const handleLogout = () => {
    dispatch(logOffUser());
  };

  if (!user) {
    return (
      <div>
        <h2>Please log in</h2>
        <Notification />
        <LoginForm />
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
          />
        ))}
    </div>
  );
};

export default App;
