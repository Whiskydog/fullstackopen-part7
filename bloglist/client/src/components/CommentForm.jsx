import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../reducers/blogs';

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(commentBlog(blogId, comment));
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />{' '}
      <button>Comment</button>
    </form>
  );
};

export default CommentForm;
