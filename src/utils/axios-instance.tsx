import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  params: {
    api_key: process.env.API_KEY,
  },
});