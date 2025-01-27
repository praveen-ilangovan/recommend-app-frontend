// React
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// api
import { deleteBoard } from "../api/app";

// Local
import { AuthContext } from "../store/AuthContext";
import { UserContext } from "../store/UserContext";
import { ROUTE } from "../constants";

export const useDeleteBoard = (boardId) => {
  const { auth } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const queryClient = useQueryClient();
  const redirect = useNavigate();


  return useMutation({
    mutationFn: deleteBoard,
    retry: false,
    onSuccess() {
      // These queryClient calls doesn't seem to do much
      queryClient.removeQueries({ queryKey: ["boards", boardId], exact: true });
      queryClient.invalidateQueries({ queryKey: ["me", user.userId] });
      redirect(ROUTE.HOME);
    },
    onError(error) {
      console.log("Failed to log in", error);
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      }
    },
  });
};
