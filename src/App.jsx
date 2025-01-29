// React
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components: Local
import RootPage from "./pages/RootPage/RootPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import BoardPage from "./pages/BoardPage/BoardPage";
import CardPage from "./pages/CardPage/CardPage";
import CardComposerPage from "./pages/CardComposerPage/CardComposerPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// Hooks
import { useUserData } from "./storage/hooks/useUserData";

// Store
import { UserContext } from "./storage/context/UserContext";

// Styling: Local
import "./App.css";

import { ROUTE } from "./constants";

// Router
// TODO: Add index & fallback
const router = createBrowserRouter([
  {
    path: ROUTE.HOME,
    element: <RootPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: ROUTE.LOGIN, element: <LoginPage /> },
      { path: ROUTE.REGISTER, element: <RegisterPage /> },
      { path: ROUTE.BOARD, element: <BoardPage /> },
      { path: ROUTE.CARD, element: <CardPage /> },
      { path: ROUTE.CREATE_CARD, element: <CardComposerPage /> },
      { path: ROUTE.ERROR, element: <ErrorPage />}
    ],
  },
]);

// ReactQuery
const queryClient = new QueryClient();

function App() {
  // User state
  const [user, setUser] = useUserData();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
