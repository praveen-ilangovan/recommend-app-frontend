// React
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Local
import { AuthContext } from "../store/AuthContext";
import { getMe } from "../api/app";
import { ROUTE } from "../constants";

export const useGetLoggedInUserData = () => {
  const { auth } = useContext(AuthContext);
  const redirect = useNavigate();

  return useQuery({
    queryKey: ["me", auth.userId],
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
  })
}
