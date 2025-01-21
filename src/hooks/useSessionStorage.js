import { useState, useEffect } from "react";
import { getSessionStorageOrDefault, setSessionStorage } from "../storage";

export function useSessionStorage(key, defaultValue) {
  const [value, setValue] = useState(
    getSessionStorageOrDefault(key, defaultValue),
  );

  useEffect(() => {
    setSessionStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}
