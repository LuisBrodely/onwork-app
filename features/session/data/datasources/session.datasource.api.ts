import { OnWorkApi } from "@/shared/config/OnWorkApi";
import { SessionCreateResponse, SessionResponse, SessionValidateResponse } from "@/features/session/data/interfaces/session.interface";
import { AxiosError } from "axios";
import {
  SignInModel,
  SignOutModel,
  SignUpModel,
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
      `users/sign_out/${request.uuid}`,
      {
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }
    );

    console.log(response);

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
    const response = await OnWorkApi.get<SessionValidateResponse>(
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


export const signUp = async (request: SignUpModel) => {
  try {
    const response = await OnWorkApi.post<SessionCreateResponse>(
      "users/sign_up",
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
}