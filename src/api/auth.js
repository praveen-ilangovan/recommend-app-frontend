
// Local Imports
import { client } from "./client";

// Utility
export const isTokenExpired = (token) => {
  const arrayToken = token.split(".");
  const payload = JSON.parse(atob(arrayToken[1]));
  return payload.exp < Date.now() / 1000;
};

// API Calls
export const registerUser = (data) => {
  return client.post("/users/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const login = async ({ emailaddress, password }) => {
  return await client.post("/session/",
    {
      username: emailaddress,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
};

export const refresh = async (token) => {
  return await client.get("/session/refresh", {
    headers: {
      RefreshToken: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}
