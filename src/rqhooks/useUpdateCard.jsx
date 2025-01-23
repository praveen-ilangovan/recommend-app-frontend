// React
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// App
import { updateCard } from "../api/app";
import { ROUTE } from "../constants";

export const useUpdateCard = (id) => { 
  const queryClient = useQueryClient();
  const redirect = useNavigate();

  return useMutation({
    mutationFn: updateCard,
    retry: false,
    onSuccess(data) {
      console.log("Successfully updated!!", data);
      queryClient.invalidateQueries({ queryKey: ["cards", id] });
    },
    onError(error) {
      console.log("Failed to log in", error);
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      }
    },
  });
};
