import axios from "axios";
import { StorageAdapter } from "../adapters/StorageAdapter";

const OnWorkApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});


OnWorkApi.interceptors.request.use(
  async (config) => {
    const token = await StorageAdapter.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }
)

export { OnWorkApi };
