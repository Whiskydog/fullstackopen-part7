import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogs';
import { useNavigate, useParams } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const currentUsername = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      navigate('/');
    }
  };

  if (!(blog && currentUsername)) return <div>Loading...</div>;

  const ownedByUser = currentUsername === blog.user.username;

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          Added by {blog.user.name}{' '}
          {ownedByUser && <button onClick={handleRemove}>remove</button>}
        </div>
      </div>
    </div>
  );
};

export default Blog;
