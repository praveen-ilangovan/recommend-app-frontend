// React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// App
import { refresh } from "../api/auth";

// Local
import { UserContext } from "../store/UserContext";
import { writeAccessToken, clearAccessToken, clearRefreshToken } from "../storage";
import { ROUTE } from "../constants";

export const useRefreshSession = () => {
  const { setUser } = useContext(UserContext);

  const redirect = useNavigate();

  return useMutation({
    mutationFn: refresh,
    onSuccess(data) {
      setUser({
        userId: data.data.id,
        userFirstname: data.data.first_name,
      });

      writeAccessToken(data.data.access_token);
    },
    onError() {
      setUser({
        userId: null,
        userFirstname: null,
      });

      clearAccessToken();
      clearRefreshToken();

      redirect(ROUTE.LOGIN);
    },
    retry: false
  });
};
