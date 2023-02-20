import axios, { AxiosInstance } from "axios";

export const clienteHttp:AxiosInstance = axios.create({
    baseURL:"http://localhost:3000"
}) 

