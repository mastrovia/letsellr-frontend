import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:4500/letseller",
  withCredentials: true,
});
export default instance;
