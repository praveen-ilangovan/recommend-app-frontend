// Third Party imports
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Local Imports
import { RECOMMEND_APP_URL } from "./constants";
import { getSessionStorageOrDefault } from "../storage";
import { refreshSession } from "./auth";

// Clients
export const client = axios.create({
  baseURL: RECOMMEND_APP_URL,
});

// Utils
export const getAccessToken = () => {
  const auth = getSessionStorageOrDefault("AuthData");
  if (auth) {
    return auth.accessToken;
  }
}

export const getRefreshToken = () => {
  const auth = getSessionStorageOrDefault("AuthData");
  if (auth) {
    return auth.refreshToken;
  }
}

export const setHeaderToken = () => {
  const token = getAccessToken();
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete client.defaults.headers.common.Authorization;
};

// createAuthRefreshInterceptor(client, refreshSession, {
//   statusCodes: [401], // default: [ 401 ]
//   pauseInstanceWhileRefreshing: true,
// });
