// Third Party Imports
import axios from "axios";

// Local Imports
import { RECOMMEND_APP_URL } from "./constants";
import { ROUTE } from "../constants";

export const getMe = (accessToken) => {
  return axios.get(`${RECOMMEND_APP_URL}/me/?show_page=false`, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
}

export const getBoard = (accessToken, boardId) => {
  const endpoint = ROUTE.BOARD.replace(":boardId", boardId);
  return axios.get(`${RECOMMEND_APP_URL}${endpoint}?show_page=false`, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
}

export const updateBoard = ({accessToken, boardId, data}) => {
  const endpoint = ROUTE.BOARD.replace(":boardId", boardId);
  return axios.put(`${RECOMMEND_APP_URL}${endpoint}`, data, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
}

export const getCard = (accessToken, cardId) => {
  const endpoint = ROUTE.CARD.replace(":cardId", cardId);
  return axios.get(`${RECOMMEND_APP_URL}${endpoint}?show_page=false`, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
}
