import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Header,
  Segment,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';

const Users = () => {
  const usersDetails = useSelector(
    (state) =>
      state.users.map((user) => ({
        id: user.id,
        name: user.name,
        blogCount: user.blogs.reduce((acc) => acc + 1, 0),
      })),
    shallowEqual
  );

  if (!usersDetails.length) return <div>Loading...</div>;

  return (
    <Segment>
      <Header as="h2">Users</Header>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>User name</TableHeaderCell>
            <TableHeaderCell>Blogs created</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersDetails.map((user) => (
            <TableRow key={user.id}>
              <TableCell selectable>
                <Link to={user.id}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Segment>
  );
};

export default Users;
