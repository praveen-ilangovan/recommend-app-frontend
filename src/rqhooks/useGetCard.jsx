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
      if (error.status === 401) {
        redirect(ROUTE.LOGIN);
      } else if (error.status === 404) {
        redirect(ROUTE.ERROR.replace(":errorCode", "404"));
      }
      console.log("Get card failed: ", error);
    },
    retry: 0,
    refetchIntervalInBackground: false,
  })
}
