import { config } from "@/config/env";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`,
  },
  timeout: 10000,
});


export default axiosInstance;