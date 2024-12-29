// Third Party Imports
import axios from "axios";

// Local Imports
import { RECOMMEND_APP_URL } from "./constants";


// Utility
export const isTokenExpired = (token) => {
  const arrayToken = token.split('.');
  const payload = JSON.parse(atob(arrayToken[1]));
  return payload.exp < Date.now() / 1000;
}

// API Calls
export const login = ({emailaddress, password}) => {
  return axios.post(`${RECOMMEND_APP_URL}/session/`, {
    username: emailaddress,
    password: password
  },
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
