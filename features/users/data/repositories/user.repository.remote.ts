import { UserRepository } from "../../domain/repositories/user.repository";
import {
  getUserByUuid,
  updateUser,
  updateUserPassword,
  getUsers,
  updateUserRole
} from "../datasources/user.datasource.api";
import { UserResponse, UsersResponse } from "../interfaces/user.interface";

import { UserUuidModel, UserUpdateModel, UserUpdateRoleModel, UserUpdatePasswordModel } from "../../domain/models/user.model";

export class UserRepositoryImpl implements UserRepository {
  async getUsers(): Promise<UsersResponse> {
    return await getUsers();
  }

  async getUserByUuid(userUuidModel: UserUuidModel): Promise<UserResponse> {
    return await getUserByUuid(userUuidModel);
  }

  async updateUser(userUpdateModel: UserUpdateModel): Promise<UserResponse> {
    return await updateUser(userUpdateModel);
  }

  async updateUserPassword(userUpdatePasswordModel: UserUpdatePasswordModel): Promise<UserResponse> {
    return await updateUserPassword(userUpdatePasswordModel);
  }

  async updateUserRole(userUpdateRoleModel: UserUpdateRoleModel): Promise<UserResponse> {
    return await updateUserRole(userUpdateRoleModel);
  }
}
