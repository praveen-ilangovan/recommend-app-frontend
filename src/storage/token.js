import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { readFromStorage, writeToStorage, clearFromStorage } from "./storage";

export function readAccessToken() {
  return readFromStorage(ACCESS_TOKEN, false);
}

export function writeAccessToken(token) {
  writeToStorage(ACCESS_TOKEN, token, false);
}

export function clearAccessToken() {
  clearFromStorage(ACCESS_TOKEN, false);
}


export function readRefreshToken() {
  return readFromStorage(REFRESH_TOKEN, true);
}

export function writeRefreshToken(token) {
  writeToStorage(REFRESH_TOKEN, token, true);
}

export function clearRefreshToken() {
  clearFromStorage(REFRESH_TOKEN, true);
}
