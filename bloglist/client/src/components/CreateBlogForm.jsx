import { useState } from 'react';
import { addBlog } from '../reducers/blogs';
import { useDispatch } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormInput,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

const CreateBlogForm = ({ toggleRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    dispatch(addBlog({ title, author, url }));
    toggleRef.current.toggle();
  };

  return (
    <Segment basic>
      <Header as="h2">Create new blog</Header>
      <Form onSubmit={handleCreateBlog}>
        <FormGroup widths="equal">
          <FormInput
            fluid
            label="Title"
            id="blog-input-title"
            name="title"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></FormInput>
          <FormInput
            fluid
            id="blog-input-author"
            label="Author"
            name="author"
            required
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FormGroup>
        <FormInput
          id="blog-input-url"
          label="URL"
          name="url"
          required
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button icon labelPosition="right" color="green">
          <Icon name="add" />
          Create
        </Button>
      </Form>
    </Segment>
  );
};

export default CreateBlogForm;
