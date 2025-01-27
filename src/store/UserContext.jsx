import { createContext } from "react";

export const UserContext = createContext({
  userId: null,
  userFirstname: null,
});
