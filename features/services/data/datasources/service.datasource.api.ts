import { OnWorkApi } from "@/shared/config/OnWorkApi";
import { AxiosError } from "axios";
import {
  ServiceResponse,
  ServicesResponse,
} from "../interfaces/service.interface";
import {
  CreateServiceModel,
  ServiceUuidModel,
  GetServicesByProviderModel,
} from "../../domain/models/service.model";

export const createService = async (request: CreateServiceModel) => {
  try {
    const response = await OnWorkApi.post<ServiceResponse>(
      "services",
      request
    );

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export const deleteService = async (request: ServiceUuidModel) => {
  try {
    const response = await OnWorkApi.delete<ServiceResponse>(
      `services/${request.uuid}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export const getServicesByProvider = async (
  request: GetServicesByProviderModel
) => {
  try {
    const response = await OnWorkApi.get<ServicesResponse>(
      `services/provider/${request.uuid}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};