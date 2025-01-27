// React
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// api
import { deleteCard } from "../api/app";

// Local
import { UserContext } from "../storage/context/UserContext";
import { ROUTE } from "../constants";

export const useDeleteCard = (id, boardId) => {
  const { user } = useContext(UserContext);

  const queryClient = useQueryClient();
  const redirect = useNavigate();

  return useMutation({
    mutationFn: deleteCard,
    retry: false,
    onSuccess() {
      // These queryClient calls doesn't seem to do much
      queryClient.removeQueries({ queryKey: ["cards", id] });
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
      queryClient.invalidateQueries({ queryKey: ["me", user.userId] });
      redirect(ROUTE.BOARD.replace(":boardId", boardId));
    },
    onError(error) {
      console.log("Failed to log in", error);
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      }
    },
  });
};
