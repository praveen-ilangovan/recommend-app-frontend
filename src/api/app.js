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

// Board

export const addBoard = ({accessToken, data}) => {
  return axios.post(`${RECOMMEND_APP_URL}/boards/`, data, {
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

export const deleteBoard = ({accessToken, boardId}) => {
  const endpoint = ROUTE.BOARD.replace(":boardId", boardId);
  return axios.delete(`${RECOMMEND_APP_URL}${endpoint}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
}

// Card

export const addCard = ({accessToken, boardId, data}) => {
  return axios.post(`${RECOMMEND_APP_URL}/boards/${boardId}/cards`, data, {
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

export const updateCard = ({accessToken, cardId, data}) => {
  const endpoint = ROUTE.CARD.replace(":cardId", cardId);
  return axios.put(`${RECOMMEND_APP_URL}${endpoint}`, data, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
}

// Scrapper
export const scrapData = ({accessToken, url}) => {
  return axios.get(`${RECOMMEND_APP_URL}/scrapper/?url=${url}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
}
