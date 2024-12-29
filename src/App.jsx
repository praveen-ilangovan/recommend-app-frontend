// React
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components: Local
import RootPage from './pages/RootPage/RootPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import BoardPage from './pages/BoardPage/BoardPage';
import CardPage from './pages/CardPage/CardPage';
import CardComposerPage from './pages/CardComposerPage/CardComposerPage';

// Hooks
import { useSessionStorage } from './hooks/useSessionStorage';

// Store
import { AuthContext } from './store/AuthContext';

// Styling: Local
import './App.css';

// Router
// TODO: Add index & fallback
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

// ReactQuery
const queryClient = new QueryClient();

function App() {
  // Auth state
  const [auth, setAuth] = useSessionStorage('AuthData', {accessToken: null, userId: null, userFirstname: null});

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App
