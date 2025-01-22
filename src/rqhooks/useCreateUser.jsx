// React
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// App
import { registerUser } from "../api/auth";

// Local
import { ROUTE } from "../constants";

export const useCreateUser = () => {
  const redirect = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    retry: false,
    onSuccess(data) {
      console.log("Successfully added a user!!", data);
      redirect(ROUTE.LOGIN);
    },
    onError(error) {
      console.log("Failed to log in", error);
    },
  });
};
