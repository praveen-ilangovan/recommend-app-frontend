// Third Party imports
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Local Imports
import { RECOMMEND_APP_URL } from "./constants";
import { getSessionStorageOrDefault,
         setSessionStorage,
         clearRefreshToken,
         clearAccessToken,
         writeAccessToken,
         readRefreshToken,
         readAccessToken } from "../storage";

// Clients
export const client = axios.create({
  baseURL: RECOMMEND_APP_URL,
});

// Utils
export const getAccessToken = () => {
  return readAccessToken();
}

export const getRefreshToken = () => {
  readRefreshToken();
}

export const setHeaderToken = () => {
  const token = getAccessToken();
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete client.defaults.headers.common.Authorization;
};

// Auth Refresh

// const fetchNewToken = async () => {
//   console.log("Refresh Token in fetchNewToken :", getRefreshToken());

//   try {
//     const token = await client
//       .get("/session/refresh", {
//         headers: {
//           RefreshToken: "Bearer " + getRefreshToken(),
//           "Content-Type": "application/json",
//         },
//       })
//       .then(res => res.data.access_token);
//     return token;
//   } catch (error) {
//     console.log("fetchNewToken:", error);
//     return null;
//   }
// }

const fetchNewToken = async () => {
  try {
    const token = await client
      .get("/session/refresh", {
        headers: {
          RefreshToken: "Bearer " + readRefreshToken(),
          "Content-Type": "application/json",
        },
      })
      .then(res => res.data);
    return token;
  } catch (error) {
    console.log("fetchNewToken:", error);
    return null;
  }
}

const refreshSession = async (failedRequest) => {
  const data = await fetchNewToken();
  const newToken = data?.access_token;

  if (newToken) {
    console.log("Session refreshed:", newToken);
    failedRequest.response.config.headers.Authorization = "Bearer " + newToken;
    setHeaderToken(newToken);

    // let authData = getSessionStorageOrDefault("AuthData");
    // authData.accessToken = newToken;
    // setSessionStorage("AuthData", authData);

    setSessionStorage("recommendAppUserData", {
      userId: data?.id,
      userFirstname: data?.first_name,
    });

    writeAccessToken(newToken);

    Promise.resolve(newToken);
  } else {
    console.log("Refresh token is expired")
    setSessionStorage("recommendAppUserData", {
      userId: null,
      userFirstname: null,
    });

    clearAccessToken();
    clearRefreshToken();

    Promise.reject(new Error());
  }
}


createAuthRefreshInterceptor(client, refreshSession, {
  statusCodes: [401], // default: [ 401 ]
  pauseInstanceWhileRefreshing: true,
});
