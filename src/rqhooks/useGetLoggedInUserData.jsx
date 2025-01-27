// React
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Local
import { UserContext } from "../storage/context/UserContext";
import { getMe } from "../api/app";
import { ROUTE } from "../constants";

export const useGetLoggedInUserData = () => {
  const { user } = useContext(UserContext);

  const redirect = useNavigate();

  return useQuery({
    queryKey: ["me", user.userId],
    queryFn: async () => {
      const data = await getMe();
      return data.data;
    },
    onError(error) {
      if (error.status === 400 || error.status === 401) {
        redirect(ROUTE.LOGIN);
      }
    },
    retry: false,
    refetchIntervalInBackground: false,
    enabled: user.userId != null
  })
}
