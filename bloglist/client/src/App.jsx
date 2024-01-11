import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './reducers/user';
import { loadBlogs } from './reducers/blogs';
import { loadUsers } from './reducers/users';
import Notification from './components/Notification';
import Login from './routes/Login';
import Menu from './components/Menu';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadBlogs());
    dispatch(loadUsers());
  }, [dispatch]);

  if (!user) return <Login />;

  return (
    <div>
      <Menu />
      <h2>Blogs</h2>
      <Notification />
      <Outlet />
    </div>
  );
};

export default App;
