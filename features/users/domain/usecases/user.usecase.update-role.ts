import { UserRepository } from "../repositories/user.repository";
import { UserResponse } from "../../data/interfaces/user.interface";
import { UserUpdateRoleModel } from "../models/user.model";

export class UpdateUserRoleUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userUpdateRoleModel: UserUpdateRoleModel): Promise<UserResponse> {
    return await this.userRepository.updateUserRole(userUpdateRoleModel);
  }
}