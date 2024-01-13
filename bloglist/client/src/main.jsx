import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './store';
import App from './App';
import Blogs from './routes/Blogs';
import Users from './routes/Users';
import UserDetails from './routes/UserDetails';
import Blog from './routes/Blog';
import 'semantic-ui-css/semantic.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Blogs />,
      },
      {
        path: 'blogs/:id',
        element: <Blog />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'users/:id',
        element: <UserDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
