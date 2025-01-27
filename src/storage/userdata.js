import { USER_DATA, DEFAULT_USER_DATA } from "../constants";
import { readFromStorage, writeToStorage, clearFromStorage } from "./storage";

export function readUserData() {
  const data = readFromStorage(USER_DATA, false);
  if (!data) {
    return DEFAULT_USER_DATA;
  }
  return JSON.parse(data);
}

export function writeUserData(data) {
  writeToStorage(USER_DATA, JSON.stringify(data), false);
}

export function clearUserData() {
  clearFromStorage(USER_DATA, false);
}
