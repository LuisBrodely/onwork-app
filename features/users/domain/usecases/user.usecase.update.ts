import { UserRepository } from "../repositories/user.repository";
import { UserResponse } from "../../data/interfaces/user.interface";
import { UserUpdateModel } from "../models/user.model";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userUpdateModel: UserUpdateModel): Promise<UserResponse> {
    return await this.userRepository.updateUser(userUpdateModel);
  }
}