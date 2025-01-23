// React
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// App
import { updateBoard } from "../api/app";
import { ROUTE } from "../constants";

export const useUpdateBoard = () => {
  const redirect = useNavigate();

  return useMutation({
    mutationFn: updateBoard,
    retry: false,
    onSuccess(data) {
      console.log("Successfully updated!!", data);
    },
    onError(error) {
      console.log("Failed to log in", error);
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      }
    },
  });
};
