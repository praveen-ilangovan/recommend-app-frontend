// React
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components: Local
import RootPage from './pages/RootPage/RootPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

// Styling: Local
import './App.css';

// Router
const router = createBrowserRouter([
  {path: '/',
   element: <RootPage />,
   children: [
    {path:'/session/new', element: <LoginPage />},
    {path:'/users/new', element: <RegisterPage />}
   ]}
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App
