import { axiosInstance } from "./axios-instance";

export const fetchData = async (endpoint: string) => {
  try {
    const { data } = await axiosInstance.get(endpoint);
    return data;
  } catch (error) {
    console.log(`Error fetching data`, error);
  }
};

export const getMoviesByCategory = async (category: string, page: number) => {
  try {
    const { data } = await axiosInstance.get(
      `/movie/${category}?language=en-US&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(`Error fetching data`, error);
  }
};