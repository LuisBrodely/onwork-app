import { OnWorkApi } from "@/shared/config/OnWorkApi";
import { AxiosError } from "axios";
import { UserResponse, UsersResponse } from "../interfaces/user.interface";
import { UserUuidModel, UserUpdateModel, UserUpdatePasswordModel, UserUpdateRoleModel } from "../../domain/models/user.model";

export const getUsers = async () => {
  try {
    const response = await OnWorkApi.get<UsersResponse>("/users");
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

export const getUserByUuid = async (request: UserUuidModel) => {
  try {
    const response = await OnWorkApi.get<UserResponse>(
      `/users/${request.uuid}`
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

export const updateUser = async (request: UserUpdateModel) => {
  try {
    const response = await OnWorkApi.put<UserResponse>(
      `/users/${request.uuid}`,
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

export const updateUserPassword = async (request: UserUpdatePasswordModel) => {
  try {
    const response = await OnWorkApi.put<UserResponse>(
      `/users/password/${request.uuid}`,
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

export const updateUserRole = async (request: UserUpdateRoleModel) => {
  console.log('CAMBIO EN EL CODIGO', request);

  try {
    const response = await OnWorkApi.put<UserResponse>(
      `/users/role/${request.uuid}`,
      request
    );

    console.log('CAMBIO EN EL CODIGO', response.data.data);
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
  
