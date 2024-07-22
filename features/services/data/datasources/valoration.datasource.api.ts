import { OnWorkApi } from "@/shared/config/OnWorkApi";
import { AxiosError } from "axios";
import {
  ValorationResponse,
  ValorationsResponse,
} from "../interfaces/valoration.interface";
import {
  CreateValorationModel,
  ValorationUuidModel,
  GetValorationsByProviderModel,
} from "../../domain/models/valoration.model";

export const createValoration = async (request: CreateValorationModel) => {
  try {
    const response = await OnWorkApi.post<ValorationResponse>(
      "valorations",
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

export const deleteValoration = async (request: ValorationUuidModel) => {
  try {
    const response = await OnWorkApi.delete<ValorationResponse>(
      `valorations/${request.uuid}`
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

export const getValorationsByProvider = async (
  request: GetValorationsByProviderModel
) => {
  try {
    const response = await OnWorkApi.get<ValorationsResponse>(
      `valorations/provider/${request.uuid}`
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