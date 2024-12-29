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

import { ROUTE } from './constants';

// Router
// TODO: Add index & fallback
const router = createBrowserRouter([
  {path: ROUTE.HOME,
   element: <RootPage />,
   children: [
    {index: true, element: <LandingPage />},
    {path:ROUTE.LOGIN, element: <LoginPage />},
    {path:ROUTE.REGISTER, element: <RegisterPage />},
    {path:ROUTE.BOARD, element: <BoardPage />},
    {path:ROUTE.CARD, element: <CardPage />},
    {path:ROUTE.EDIT_CARD, element: <CardComposerPage />},
    {path:ROUTE.CREATE_CARD, element: <CardComposerPage />}
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
