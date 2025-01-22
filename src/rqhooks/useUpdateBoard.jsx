// React
import { useMutation } from "@tanstack/react-query";

// App
import { updateBoard } from "../api/app";

export const useUpdateBoard = () => {
  return useMutation({
    mutationFn: updateBoard,
    retry: false,
    onSuccess(data) {
      console.log("Successfully updated!!", data);
    },
    onError(error) {
      console.log("Failed to log in", error);
    },
  });
};
