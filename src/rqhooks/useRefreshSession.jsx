// React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// App
import { refresh } from "../api/auth";

// Local
import { AuthContext } from "../store/AuthContext";
import { UserContext } from "../store/UserContext";
import { writeAccessToken, clearAccessToken, clearRefreshToken } from "../storage";
import { ROUTE } from "../constants";

export const useRefreshSession = () => {
  const { setAuth } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const redirect = useNavigate();

  return useMutation({
    mutationFn: refresh,
    onSuccess(data) {
      setAuth({
        // accessToken: data.data.access_token,
        // refreshToken: data.data.refresh_token,
        userId: data.data.id,
        userFirstname: data.data.first_name,
      });

      setUser({
        userId: data.data.id,
        userFirstname: data.data.first_name,
      });

      writeAccessToken(data.data.access_token);
    },
    onError() {
      setAuth({
        // accessToken: null,
        // refreshToken: null,
        userId: null,
        userFirstname: null,
      });

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
