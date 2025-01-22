// React
import { useMutation } from "@tanstack/react-query";

// App
import { addBoard } from "../api/app";

export const useCreateBoard = () => {
  return useMutation({
    mutationFn: addBoard,
    retry: false,
    onError(error) {
      console.log("Failed to log in", error);
    },
  });
};
