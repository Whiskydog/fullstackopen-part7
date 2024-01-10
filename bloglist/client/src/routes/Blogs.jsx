import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Toggle from '../components/Toggle';
import CreateBlogForm from '../components/CreateBlogForm';
import Blog from '../components/Blog';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const toggleRef = useRef();

  return (
    <div>
      <Toggle label="New blog" ref={toggleRef}>
        <CreateBlogForm toggleRef={toggleRef} />
      </Toggle>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            fromUser={user.username === blog.user.username}
          />
        ))}
    </div>
  );
};

export default Blogs;
