// React
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// api
import { deleteBoard } from "../api/app";

// Local
import { AuthContext } from "../store/AuthContext";
import { ROUTE } from "../constants";

export const useDeleteBoard = (boardId) => {
  const { auth } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const redirect = useNavigate();


  return useMutation({
    mutationFn: deleteBoard,
    retry: false,
    onSuccess() {
      // These queryClient calls doesn't seem to do much
      queryClient.removeQueries({ queryKey: ["boards", boardId], exact: true });
      queryClient.invalidateQueries({ queryKey: ["me", auth.userId] });
      redirect(ROUTE.HOME);
    },
    onError(error) {
      console.log("Failed to log in", error);
    },
  });
};
