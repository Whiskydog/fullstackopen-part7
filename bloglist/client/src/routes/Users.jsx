import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const usersDetails = useSelector(
    (state) =>
      state.users.map((user) => ({
        id: user.id,
        name: user.name,
        blogCount: user.blogs.reduce((acc) => acc + 1, 0),
      })),
    shallowEqual
  );

  if (!usersDetails.length) return <div>Loading...</div>;

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
          {usersDetails.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
