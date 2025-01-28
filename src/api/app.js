
// Local Imports
import { ROUTE } from "../constants";
import { client } from "./client";
import { readAccessToken } from "../storage/token";

const getHeaders = () => {
  return {
    Authorization: "Bearer " + readAccessToken(),
    "Content-Type": "application/json",
  };
}

export const getMe = async () => {
  return await client.get("/me/", {
    headers: getHeaders(),
  });
};

// Board
export const addBoard = async ({ data }) => {
  return await client.post("/boards/", data, {
    headers: getHeaders(),
  });
};

export const getBoard = async (boardId) => {
  const endpoint = ROUTE.BOARD.replace(":boardId", boardId);
  return await client.get(endpoint, {
    headers: getHeaders(),
  });
};

export const updateBoard = async ({ boardId, data }) => {
  const endpoint = ROUTE.BOARD.replace(":boardId", boardId);
  return await client.put(endpoint, data, {
    headers: getHeaders(),
  });
};

export const deleteBoard = async ({ boardId }) => {
  const endpoint = ROUTE.BOARD.replace(":boardId", boardId);
  return await client.delete(endpoint, {
    headers: getHeaders(),
  });
};

// Card

export const addCard = async ({ boardId, data }) => {
  return await client.post(`/boards/${boardId}/cards`, data, {
    headers: getHeaders(),
  });
};

export const getCard = async (cardId) => {
  const endpoint = ROUTE.CARD.replace(":cardId", cardId);
  return await client.get(endpoint, {
    headers: getHeaders(),
  });
};

export const updateCard = async ({ cardId, data }) => {
  const endpoint = ROUTE.CARD.replace(":cardId", cardId);
  return await client.put(endpoint, data, {
    headers: getHeaders(),
  });
};

export const deleteCard = async ({ cardId }) => {
  const endpoint = ROUTE.CARD.replace(":cardId", cardId);
  return await client.delete(endpoint, {
    headers: getHeaders(),
  });
};

// Scrapper
export const scrapData = async (url) => {
  return await client.get(`/scrapper/?url=${url}`, {
    headers: getHeaders(),
  });
};
