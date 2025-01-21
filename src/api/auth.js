
// Local Imports
import { client, getRefreshToken, setHeaderToken } from "./client";
import { getSessionStorageOrDefault, setSessionStorage } from "../storage";


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

export const login = ({ emailaddress, password }) => {
  return client.post("/session/",
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

const fetchNewToken = async () => {
  try {
    const token = await client
      .get("/session/refresh", {
        headers: {
          RefreshToken: "Bearer " + getRefreshToken(),
          "Content-Type": "application/json",
        },
      })
      .then(res => res.data.access_token);
    return token;
  } catch (error) {
    console.log("fetchNewToken:", error);
    return null;
  }
}

// const fetchNewToken = async () => {
//   return await client.get("/session/refresh", {
//       headers: {
//         RefreshToken: "Bearer " + getRefreshToken(),
//         "Content-Type": "application/json",
//       },
//     })
// }


// export const refreshSession = async (failedRequest) => {
//   const response = await fetchNewToken();

//   if (response.ok) {
//     const newToken = response.data.accessToken;
//     console.log("Session refreshed:", newToken);
//     failedRequest.response.config.headers.Authorization = "Bearer " + newToken;
//     setHeaderToken(newToken);

//     let authData = getSessionStorageOrDefault("AuthData");
//     authData.accessToken = newToken;
//     setSessionStorage("AuthData", authData);
//   } else {

//     console.log("Refresh token is expired")
//     setSessionStorage("AuthData", {
//       accessToken: null,
//       refreshToken: null,
//       userId: null,
//       userFirstname: null,
//     });

//     return response;
//   }
// }

export const refreshSession = async (failedRequest) => {
  const newToken = await fetchNewToken();

  if (newToken) {
    console.log("Session refreshed:", newToken);
    failedRequest.response.config.headers.Authorization = "Bearer " + newToken;
    setHeaderToken(newToken);

    let authData = getSessionStorageOrDefault("AuthData");
    authData.accessToken = newToken;
    setSessionStorage("AuthData", authData);

    Promise.resolve(newToken);
  } else {
    console.log("Refresh token is expired")
    setSessionStorage("AuthData", {
      accessToken: null,
      refreshToken: null,
      userId: null,
      userFirstname: null,
    });

    Promise.reject(new Error());
  }
}
