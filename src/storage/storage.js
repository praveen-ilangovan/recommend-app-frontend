const getStorage = (persistant) => {
  return persistant ? localStorage : sessionStorage;
}

export const readFromStorage = (key, persistant=false) => {
  const storage = getStorage(persistant);
  return storage.getItem(key);
}

export const writeToStorage = (key, value, persistant=false) => {
  const storage = getStorage(persistant);
  storage.setItem(key, value);
}

export const clearFromStorage = (key, persistant=false) => {
  const storage = getStorage(persistant);
  storage.removeItem(key);
}
