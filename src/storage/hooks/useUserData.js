import { useState, useEffect } from "react";
import { readUserData, writeUserData } from "../userdata";

export function useUserData() {
  const [value, setValue] = useState( readUserData() );

  useEffect(() => {
    writeUserData(value);
  }, [value]);

  return [value, setValue];
}
