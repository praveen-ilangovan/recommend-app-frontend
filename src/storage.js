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
