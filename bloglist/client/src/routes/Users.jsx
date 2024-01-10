import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../reducers/users';

const Users = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state) =>
      state.users.map((user) => ({
        name: user.name,
        blogCount: user.blogs.reduce((acc) => acc + 1, 0),
      })),
    shallowEqual
  );

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
