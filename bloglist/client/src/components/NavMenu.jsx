import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/user';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem, MenuMenu } from 'semantic-ui-react';

const NavMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/');
    dispatch(logoutUser());
  };

  return (
    <Menu as="nav" borderless>
      <MenuItem header>Blog List App</MenuItem>
      <MenuMenu position="right">
        <MenuItem link onClick={() => navigate('/')}>
          Blogs
        </MenuItem>
        <MenuItem link onClick={() => navigate('/users')}>
          Users
        </MenuItem>
        <MenuItem>
          <span style={{ paddingRight: '1rem' }}>
            {user.user.name} logged in
          </span>
          <Button compact color="red" onClick={handleLogOut}>
            Log out
          </Button>
        </MenuItem>
      </MenuMenu>
    </Menu>
  );
};

export default NavMenu;
