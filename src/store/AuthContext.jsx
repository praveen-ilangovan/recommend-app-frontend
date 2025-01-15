import { createContext } from "react";

export const AuthContext = createContext({
  accessToken: null,
  userId: null,
  userFirstname: null,
});
