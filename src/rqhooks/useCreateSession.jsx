// React
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// App
import { login } from "../api/auth";

// Local
import { AuthContext } from "../store/AuthContext";
import { UserContext } from "../store/UserContext";
import { ROUTE } from "../constants";
import { writeAccessToken, writeRefreshToken } from "../storage";

export const useCreateSession = () => {
  const { setAuth } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const redirect = useNavigate();

  return useMutation({
    mutationFn: login,
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
      writeRefreshToken(data.data.refresh_token);

      redirect(ROUTE.HOME);
    },
    retry: false
  });
};
