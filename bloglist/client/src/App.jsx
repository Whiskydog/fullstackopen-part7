import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './reducers/user';
import { loadBlogs } from './reducers/blogs';
import { loadUsers } from './reducers/users';
import Notification from './components/Notification';
import Login from './routes/Login';
import NavMenu from './components/NavMenu';
import { Segment } from 'semantic-ui-react';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadBlogs());
    dispatch(loadUsers());
  }, [dispatch]);

  if (!user.user) {
    return <Login />;
  }

  return (
    <Segment basic>
      <NavMenu />
      <main>
        <Notification />
        <Outlet />
      </main>
    </Segment>
  );
};

export default App;
