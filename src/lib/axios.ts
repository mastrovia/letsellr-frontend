import axios from "axios";

const instance = axios.create({
  baseURL:"http://localhost:4500/letseller",
  withCredentials: true,
});

export default instance;