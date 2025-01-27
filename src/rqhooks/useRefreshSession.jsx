// React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// App
import { refresh } from "../api/auth";

// Local
import { AuthContext } from "../store/AuthContext";
import { ROUTE } from "../constants";

export const useRefreshSession = () => {
  const { setAuth } = useContext(AuthContext);
  const redirect = useNavigate();

  return useMutation({
    mutationFn: refresh,
    onSuccess(data) {
      setAuth({
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token,
        userId: data.data.id,
        userFirstname: data.data.first_name,
      });
    },
    onError() {
      setAuth({
        accessToken: null,
        refreshToken: null,
        userId: null,
        userFirstname: null,
      });

      redirect(ROUTE.LOGIN);
    },
    retry: false
  });
};
