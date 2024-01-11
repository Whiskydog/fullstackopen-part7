import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Toggle from '../components/Toggle';
import CreateBlogForm from '../components/CreateBlogForm';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const toggleRef = useRef();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Toggle label="New blog" ref={toggleRef}>
        <CreateBlogForm toggleRef={toggleRef} />
      </Toggle>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default Blogs;
