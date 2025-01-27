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

export function readRefreshToken() {
  return localStorage.getItem("recommendAppRefreshTokenV2");
}

export function writeRefreshToken(token) {
  localStorage.setItem("recommendAppRefreshTokenV2", token);
}

export function clearRefreshToken(token) {
  localStorage.removeItem("recommendAppRefreshTokenV2");
}
