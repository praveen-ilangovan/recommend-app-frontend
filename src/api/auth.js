// Third Party Imports
import axios from "axios";

// Local Imports
import { RECOMMEND_APP_URL } from "./constants";

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
