// React
import { useMutation } from "@tanstack/react-query";

// App
import { scrapData } from "../api/app";

export const useScrapper = () => { 
  return useMutation({
    mutationFn: scrapData,
    retry: false,
    onSuccess(data) {
      console.log("Scrapped data: ", data);
    },
    onError(error) {
      console.log("Failed to log in", error);
    },
  });
};
