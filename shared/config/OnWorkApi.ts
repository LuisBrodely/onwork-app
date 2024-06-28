import axios from "axios";
import { StorageAdapter } from "../adapters/StorageAdapter";

const OnWorkApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});


OnWorkApi.interceptors.request.use(
  async (config) => {
    const accessToken = await StorageAdapter.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  }
)

export { OnWorkApi };
