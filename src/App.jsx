// React
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components: Local
import RootPage from './pages/RootPage/RootPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import BoardPage from './pages/BoardPage/BoardPage';
import CardPage from './pages/CardPage/CardPage';
import CardComposerPage from './pages/CardComposerPage/CardComposerPage';

// Styling: Local
import './App.css';

// Router
const router = createBrowserRouter([
  {path: '/',
   element: <RootPage />,
   children: [
    {path:'/me', element: <LandingPage />},
    {path:'/session/new', element: <LoginPage />},
    {path:'/users/new', element: <RegisterPage />},
    {path:'/boards/:boardId', element: <BoardPage />},
    {path:'/cards/:cardId', element: <CardPage />},
    {path:'/cards/:cardId/edit', element: <CardComposerPage />},
    {path:'/cards/new', element: <CardComposerPage />}
   ]}
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App
