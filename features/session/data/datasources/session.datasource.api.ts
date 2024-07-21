import { OnWorkApi } from "@/shared/config/OnWorkApi";
import { SessionResponse } from "@/features/session/data/interfaces/session.interface";
import { AxiosError } from "axios";
import {
  SignInModel,
  SignOutModel,
  ActivateModel,
  ValidateTokenModel,
} from "@/features/session/domain/models/session.model";

export const singIn = async (request: SignInModel) => {
  try {
    const response = await OnWorkApi.post<SessionResponse>(
      "users/sign_in",
      request
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

export const signOut = async (request: SignOutModel) => {
  try {
    const response = await OnWorkApi.get<SessionResponse>(
      `users/sign_out/${request.uuid}`
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

export const activate = async (request: ActivateModel) => {
  try {
    const response = await OnWorkApi.post<SessionResponse>(
      `users/activate/${request.uuid}`,
      { token: request.token }
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

export const validateToken = async (request: ValidateTokenModel) => {
  try {
    const response = await OnWorkApi.get<SessionResponse>(
      'users/validate/',
      {
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }
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