
// Local Imports
import { ROUTE } from "../constants";
import { client, getAccessToken } from "./client";

const getHeaders = () => {
  return {
    Authorization: "Bearer " + getAccessToken(),
    "Content-Type": "application/json",
  };
}

export const getMe = () => {
  return client.get("/me/", {
    headers: getHeaders(),
  });
};

// Board
export const addBoard = ({ accessToken, data }) => {
  return client.post("/boards/", data, {
    headers: getHeaders(),
  });
};

export const getBoard = (accessToken, boardId) => {
  const endpoint = ROUTE.BOARD.replace(":boardId", boardId);
  return client.get(endpoint, {
    headers: getHeaders(),
  });
};

export const updateBoard = ({ accessToken, boardId, data }) => {
  const endpoint = ROUTE.BOARD.replace(":boardId", boardId);
  return client.put(endpoint, data, {
    headers: getHeaders(),
  });
};

export const deleteBoard = ({ accessToken, boardId }) => {
  const endpoint = ROUTE.BOARD.replace(":boardId", boardId);
  return client.delete(endpoint, {
    headers: getHeaders(),
  });
};

// Card

export const addCard = ({ accessToken, boardId, data }) => {
  return client.post(`/boards/${boardId}/cards`, data, {
    headers: getHeaders(),
  });
};

export const getCard = (accessToken, cardId) => {
  const endpoint = ROUTE.CARD.replace(":cardId", cardId);
  return client.get(endpoint, {
    headers: getHeaders(),
  });
};

export const updateCard = ({ accessToken, cardId, data }) => {
  const endpoint = ROUTE.CARD.replace(":cardId", cardId);
  return client.put(endpoint, data, {
    headers: getHeaders(),
  });
};

export const deleteCard = ({ accessToken, cardId }) => {
  const endpoint = ROUTE.CARD.replace(":cardId", cardId);
  return client.delete(endpoint, {
    headers: getHeaders(),
  });
};

// Scrapper
export const scrapData = ({ accessToken, url }) => {
  return client.get(`/scrapper/?url=${url}`, {
    headers: getHeaders(),
  });
};
