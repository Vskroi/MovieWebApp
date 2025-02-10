import axios from "axios";
const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.API_KEY
const instance = axios.create({baseURL:BASE_URL})
export const getPopularMovies = async (page?: number) => {
    const {data} =await instance.get(
        `/movie/popular?language=en-US&page=${page || 1}&api_key${API_KEY}`
    )
    return data
}
export const fetchmovieUpcoming = async (page?: number) => {
    const {data} =await instance.get(
        `/movie/upcoming?language=en-US&page=${page || 1}&api_key${API_KEY}`
    )
    
    return data
}