import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Divider, Header, List, ListItem, Segment } from 'semantic-ui-react';

const UserDetails = () => {
  const { id } = useParams();
  const user = useSelector(
    (state) => state.users.find((user) => user.id === id),
    shallowEqual
  );

  if (!user) return <div>Loading...</div>;

  return (
    <Segment>
      <Header as="h2">{user.name}</Header>
      <Divider />
      <Header as="h3">Added blogs</Header>
      <List celled relaxed>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </Segment>
  );
};

export default UserDetails;
