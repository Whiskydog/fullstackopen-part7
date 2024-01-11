import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logOffUser } from './reducers/user';
import { loadBlogs } from './reducers/blogs';
import { loadUsers } from './reducers/users';
import Notification from './components/Notification';
import Login from './routes/Login';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadBlogs());
    dispatch(loadUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logOffUser());
  };

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Outlet />
    </div>
  );
};

export default App;
