import LoginForm from '../components/LoginForm';
import Notification from '../components/Notification';

const Login = () => {
  return (
    <div>
      <h2>Please log in</h2>
      <Notification />
      <LoginForm />
    </div>
  );
};

export default Login;
