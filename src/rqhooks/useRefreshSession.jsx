// React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// App
import { refresh } from "../api/auth";

// Local
import { UserContext } from "../storage/context/UserContext";
import { writeAccessToken, clearTokens } from "../storage/token";
import { ROUTE, DEFAULT_USER_DATA } from "../constants";

export const useRefreshSession = (redirectUponError=false) => {
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
      setUser(DEFAULT_USER_DATA);
      clearTokens();
      if (redirectUponError) {
        redirect(ROUTE.LOGIN);
      }
    },
    retry: false
  });
};
