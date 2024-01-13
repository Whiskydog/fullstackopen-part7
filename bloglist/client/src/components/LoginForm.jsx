import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/user';
import {
  Form,
  FormButton,
  FormInput,
  Grid,
  GridColumn,
  Message,
} from 'semantic-ui-react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
    setUsername('');
    setPassword('');
  };

  return (
    <Grid centered>
      <GridColumn width={7}>
        <Form
          onSubmit={handleLogin}
          loading={status === 'pending'}
          error={status === 'rejected'}
        >
          <FormInput
            label="Username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <FormButton>Log in</FormButton>
          <Message error>{error}</Message>
        </Form>
      </GridColumn>
    </Grid>
  );
};

export default LoginForm;
