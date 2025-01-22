// React
import { useMutation, useQueryClient } from "@tanstack/react-query";

// App
import { updateCard } from "../api/app";

export const useUpdateCard = (id) => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCard,
    retry: false,
    onSuccess(data) {
      console.log("Successfully updated!!", data);
      queryClient.invalidateQueries({ queryKey: ["cards", id] });
    },
    onError(error) {
      console.log("Failed to log in", error);
    },
  });
};
