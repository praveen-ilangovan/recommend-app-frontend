// React
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Local
import { getBoard } from "../api/app";
import { ROUTE } from "../constants";

export const useGetBoard = (boardId) => {
  const redirect = useNavigate();

  return useQuery({
    queryKey: ["boards", boardId],
    queryFn: async () => {
      const data = await getBoard(boardId);
      return data;
    },
    onError(error) {
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      }
    },
    retry: 0,
    refetchIntervalInBackground: false,
  })
}
