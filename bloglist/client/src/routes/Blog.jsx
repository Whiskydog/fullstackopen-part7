import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogs';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Divider,
  Header,
  HeaderContent,
  HeaderSubheader,
  Icon,
  Label,
  LabelDetail,
  Segment,
} from 'semantic-ui-react';
import Comments from '../components/Comments';

const Blog = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const currentUsername = useSelector((state) => state.user.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      navigate('/');
    }
  };

  if (!(blog && currentUsername)) return <div>Loading...</div>;

  const ownedByUser = currentUsername === blog.user.username;

  return (
    <Segment className="blog">
      <Header as="h2">
        <HeaderContent>
          {blog.title}
          <HeaderSubheader>{blog.author}</HeaderSubheader>
        </HeaderContent>
      </Header>
      <Label>
        Added by <LabelDetail>{blog.user.name}</LabelDetail>
      </Label>
      <Divider />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button
          as="a"
          href={blog.url}
          target="_blank"
          icon
          labelPosition="right"
        >
          READ BLOG
          <Icon name="external" />
        </Button>
        <Button
          as="div"
          labelPosition="right"
          onClick={() => dispatch(likeBlog(blog))}
        >
          <Button icon color="blue">
            <Icon name="thumbs up" />
            Like
          </Button>
          <Label basic color="blue" pointing="left">
            {blog.likes}
          </Label>
        </Button>
        {ownedByUser && (
          <Button color="red" onClick={handleRemove}>
            <Icon name="delete" />
            Remove
          </Button>
        )}
      </div>
      <Comments blogId={blog.id} comments={blog.comments} />
    </Segment>
  );
};

export default Blog;
