import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Comment,
  CommentGroup,
  CommentText,
  Divider,
  Form,
  FormGroup,
  FormInput,
  Header,
  Segment,
} from 'semantic-ui-react';
import { commentBlog } from '../reducers/blogs';

const Comments = ({ blogId, comments }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(commentBlog(blogId, comment));
    setComment('');
  };

  return (
    <CommentGroup minimal>
      <Header as="h3" dividing>
        Comments
      </Header>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormInput
            width={10}
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button>Comment</Button>
        </FormGroup>
      </Form>
      <Segment basic>
        {comments.map((comment) => (
          <Comment key={comment.id}>
            <CommentText>{comment.content}</CommentText>
            <Divider />
          </Comment>
        ))}
      </Segment>
    </CommentGroup>
  );
};

export default Comments;
