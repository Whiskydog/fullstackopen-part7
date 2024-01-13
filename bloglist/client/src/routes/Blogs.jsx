import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Toggle from '../components/Toggle';
import CreateBlogForm from '../components/CreateBlogForm';
import { Link } from 'react-router-dom';
import { Header, List, ListItem, Segment } from 'semantic-ui-react';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const toggleRef = useRef();

  return (
    <>
      <Segment basic padded>
        <Header as="h2">Posted blogs</Header>
        <List relaxed selection>
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              <ListItem key={blog.id}>
                <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
              </ListItem>
            ))}
        </List>
      </Segment>
      <Toggle label="New blog" ref={toggleRef}>
        <CreateBlogForm toggleRef={toggleRef} />
      </Toggle>
    </>
  );
};

export default Blogs;
