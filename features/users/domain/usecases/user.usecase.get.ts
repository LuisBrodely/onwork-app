import { UserRepository } from "../repositories/user.repository";
import { UsersResponse } from "../../data/interfaces/user.interface";

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UsersResponse> {
    return await this.userRepository.getUsers();
  }
}