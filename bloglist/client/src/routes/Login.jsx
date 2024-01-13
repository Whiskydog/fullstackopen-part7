import { Header, Segment } from 'semantic-ui-react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <Segment basic padded="very">
      <Header as="h2" textAlign="center">
        Please log in
      </Header>
      <LoginForm />
    </Segment>
  );
};

export default Login;
