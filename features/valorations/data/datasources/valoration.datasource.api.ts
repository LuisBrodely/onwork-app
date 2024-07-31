import { OnWorkApi } from "@/shared/config/OnWorkApi";
import { AxiosError } from "axios";
import {
  ValorationResponse,
  ValorationSerieResponse,
  ValorationsResponse,
} from "../interfaces/valoration.interface";
import {
  CreateValorationModel,
  ValorationUuidModel,
  GetValorationsByProviderModel,
  GetValorationsByUserModel,
  GetValorationsSerieByUserModel,
} from "../../domain/models/valoration.model";

export const createValoration = async (request: CreateValorationModel) => {
  try {
    const response = await OnWorkApi.post<ValorationResponse>(
      "valorations",
      {
        user_uuid: request.user_uuid,
        provider_uuid: request.provider_uuid,
        rating: request.rating,
        comment: request.comment,
      }
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

export const getValorationsByUser = async (
  request: GetValorationsByUserModel
) => {
  try {
    const response = await OnWorkApi.get<ValorationsResponse>(
      `valorations/user/${request.uuid}`
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

export const getValorationsSerieByUser = async (request: GetValorationsSerieByUserModel) => {
  try {
    const response = await OnWorkApi.get<ValorationSerieResponse>(
      `valorations/serie/user/${request.uuid}/days/${request.days}`
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
}