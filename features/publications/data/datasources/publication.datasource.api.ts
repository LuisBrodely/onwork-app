import { OnWorkApi, OnWorkApiPublications } from "@/shared/config/OnWorkApi";
import { AxiosError } from "axios";
import {
  PublicationBoolResponse,
  PublicationResponse,
  PublicationsResponse,
} from "../interfaces/publication.interface";
import {
  CreatePublicationModel,
  PublicationUuidModel,
  GetPublicationsByUserModel,
} from "../../domain/models/publication.model";

export const createPublication = async (request: CreatePublicationModel) => {
  try {
    const response = await OnWorkApiPublications.post<PublicationResponse>(
      "publications",
      request.formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
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

export const getPublicationsByUser = async (
  request: GetPublicationsByUserModel
) => {
  try {

    const response = await OnWorkApi.get<PublicationsResponse>(
      `publications/user/${request.uuid}`
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

export const getPublicationByUuid = async (request: PublicationUuidModel) => {
  try {
    const response = await OnWorkApi.get<PublicationResponse>(
      `publications/${request.uuid}`
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

export const deletePublication = async (request: PublicationUuidModel) => {
  try {
    const response = await OnWorkApi.delete<PublicationBoolResponse>(
      `publications/${request.uuid}`
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
