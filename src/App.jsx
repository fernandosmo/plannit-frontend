import { Container } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login></Login>,
  },
  {
    path: '/home',
    element: <Home></Home>,
  },
]);

function App() {
  function RenderAPP() {
    return (
      <Container>
        <RouterProvider router={router} />
      </Container>
    );
  }
  return <RenderAPP></RenderAPP>;
}

export default App;
