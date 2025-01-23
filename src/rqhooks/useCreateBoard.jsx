// React
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// App
import { addBoard } from "../api/app";
import { ROUTE } from "../constants";

export const useCreateBoard = () => {
  const redirect = useNavigate();

  return useMutation({
    mutationFn: addBoard,
    retry: false,
    onError(error) {
      console.log("Failed to log in", error);
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      }
    },
  });
};
