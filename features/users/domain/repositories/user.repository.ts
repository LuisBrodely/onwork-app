import { UserResponse, UsersResponse } from "../../data/interfaces/user.interface";
import { UserUuidModel, UserUpdateModel, UserUpdatePasswordModel, UserUpdateRoleModel } from "../models/user.model";

export interface UserRepository {
  getUsers: () => Promise<UsersResponse>;
  getUserByUuid: (userUuidModel: UserUuidModel) => Promise<UserResponse>;
  updateUser: (userUpdateModel: UserUpdateModel) => Promise<UserResponse>;
  updateUserPassword: (userUpdatePasswordModel: UserUpdatePasswordModel) => Promise<UserResponse>;
  updateUserRole: (userUpdateRoleModel: UserUpdateRoleModel) => Promise<UserResponse>;
}