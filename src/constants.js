// Constants used across the application

// ROUTES
export const ROUTE = {
  HOME: "/",
  LOGIN: "/session/new",
  REGISTER: "/users/new",
  BOARD: "/boards/:boardId",
  CARD: "/cards/:cardId",
  CREATE_CARD: "/cards/new",
  BOARD_ROOT: "/boards",
  CARD_ROOT: "/cards",
  ERROR: "/error/:errorCode"
};

// TOKENS
export const ACCESS_TOKEN = "recommendAppAccessToken";
export const REFRESH_TOKEN = "recommendAppRefreshToken";
export const USER_DATA = "recommendAppUserData";

export const DEFAULT_USER_DATA = {
  userId: null,
  userFirstname: null,
};
