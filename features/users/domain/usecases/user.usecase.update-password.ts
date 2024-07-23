import { UserRepository } from "../repositories/user.repository";
import { UserResponse } from "../../data/interfaces/user.interface";
import { UserUpdatePasswordModel } from "../models/user.model";

export class UpdateUserPasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userUpdatePasswordModel: UserUpdatePasswordModel): Promise<UserResponse> {
    return await this.userRepository.updateUserPassword(userUpdatePasswordModel);
  }
}