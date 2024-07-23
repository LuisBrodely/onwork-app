import { OnWorkApi } from "@/shared/config/OnWorkApi";
import { AxiosError } from "axios";
import { ProvidersResponse } from "@/features/providers/data/interfaces/provider.interface";

export const getProviders = async () => {
  try {
    const response = await OnWorkApi.get<ProvidersResponse>('/users/providers');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
}