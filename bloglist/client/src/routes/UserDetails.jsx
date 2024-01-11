import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const user = useSelector(
    (state) => state.users.find((user) => user.id === id),
    shallowEqual
  );

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
