import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser } from '../reducers/user';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(logInUser(username, password));
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
