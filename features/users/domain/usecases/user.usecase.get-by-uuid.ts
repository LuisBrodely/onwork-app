import { UserRepository } from "../repositories/user.repository";
import { UserResponse } from "../../data/interfaces/user.interface";
import { UserUuidModel } from "../models/user.model";

export class GetUserByUuidUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userUuidModel: UserUuidModel): Promise<UserResponse> {
    return await this.userRepository.getUserByUuid(userUuidModel);
  }
}