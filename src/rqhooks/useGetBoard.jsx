// React
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Local
import { getBoard } from "../api/app";
import { AuthContext } from "../store/AuthContext";
import { ROUTE } from "../constants";

export const useGetBoard = (boardId) => {
  const { auth } = useContext(AuthContext);
  const redirect = useNavigate();

  return useQuery({
    queryKey: ["boards", boardId],
    queryFn: async () => {
      const data = await getBoard(auth.accessToken, boardId);
      return data;
    },
    onError(error) {
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      } else if (error.status === 404 && boardId) {
        redirect(ROUTE.ERROR.replace(":errorCode", "404"));
      }
    },
    retry: 0,
    refetchIntervalInBackground: false,
  })
}
