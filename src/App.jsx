// React
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
import RootPage from './pages/RootPage/RootPage';
import LoginPage from './pages/LoginPage/LoginPage';

// Styling: Local
import './App.css';

// Router
const router = createBrowserRouter([
  {path: '/',
   element: <RootPage />,
   children: [
    {path:'/session/new', element: <LoginPage />}
   ]}
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App
