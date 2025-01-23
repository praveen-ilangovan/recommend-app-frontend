// React
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// App
import { addCard } from "../api/app";

// Local
import { ROUTE } from "../constants";

export const useCreateCard = () => {
  const redirect = useNavigate();

  return useMutation({
    mutationFn: addCard,
    retry: false,
    onSuccess(data) {
      const url = ROUTE.CARD.replace(":cardId", data.data.id);
      redirect(url);
    },
    onError(error) {
      console.log("Failed to log in", error);
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      }
    }
  })
};
