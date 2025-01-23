// React
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Local
import { getCard } from "../api/app";
import { ROUTE } from "../constants";

export const useGetCard = (cardId) => {
  const redirect = useNavigate();

  return useQuery({
    queryKey: ["cards", cardId],
    queryFn: async () => {
      const data = await getCard(cardId);
      return data;
    },
    onError(error) {
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      }
      console.log("Page Not Found")
    },
    retry: 0,
    refetchIntervalInBackground: false,
  })
}
