// React
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// App
import { login } from "../api/auth";

// Local
import { AuthContext } from "../store/AuthContext";
import { ROUTE } from "../constants";
import { writeRefreshToken } from "../storage";

export const useCreateSession = () => {
  const { setAuth } = useContext(AuthContext);
  const redirect = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess(data) {
      setAuth({
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token,
        userId: data.data.id,
        userFirstname: data.data.first_name,
      });

      writeRefreshToken(data.data.refresh_token);

      redirect(ROUTE.HOME);
    },
    retry: false
  });
};
