import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;


export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseURL}/auth/login`, data);
      return response.data;
    },
  });
};
