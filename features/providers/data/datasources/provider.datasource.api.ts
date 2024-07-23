import { OnWorkApi } from "@/shared/config/OnWorkApi";
import { AxiosError } from "axios";
import { ProviderRequest } from "@/features/providers/domain/models/provider.model";
import { ProviderResponse } from "@/features/providers/data/interfaces/provider.interface";

export const getProviders = async (request: ProviderRequest) => {
  try {
    const response = await OnWorkApi.get<ProviderResponse>('/users/', {
      headers: {
        'Authorization': `Bearer ${request.token}`
      }
    });
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