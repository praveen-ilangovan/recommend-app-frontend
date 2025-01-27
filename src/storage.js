export function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

export function setSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

// Tokens!!

export function readAccessToken() {
  return sessionStorage.getItem("recommendAppAccessTokenV2");
}

export function writeAccessToken(token) {
  sessionStorage.setItem("recommendAppAccessTokenV2", token);
}

export function clearAccessToken() {
  sessionStorage.removeItem("recommendAppAccessTokenV2");
}


export function readRefreshToken() {
  return localStorage.getItem("recommendAppRefreshTokenV2");
}

export function writeRefreshToken(token) {
  localStorage.setItem("recommendAppRefreshTokenV2", token);
}

export function clearRefreshToken() {
  localStorage.removeItem("recommendAppRefreshTokenV2");
}
