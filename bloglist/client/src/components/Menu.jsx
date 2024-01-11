import { useDispatch, useSelector } from 'react-redux';
import { logOffUser } from '../reducers/user';
import { Link } from 'react-router-dom';

const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const style = {
    backgroundColor: 'lightgrey',
    padding: '4px',
  };

  return (
    <nav style={style}>
      <Link to={'/'}>Blogs</Link> <Link to={'/users'}>Users</Link> {user.name}{' '}
      logged in <button onClick={() => dispatch(logOffUser())}>logout</button>
    </nav>
  );
};

export default Menu;
