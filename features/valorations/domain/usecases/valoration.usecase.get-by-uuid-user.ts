import { ValorationRepository } from "../repositories/valoration.repository";
import { ValorationsResponse } from "../../data/interfaces/valoration.interface";
import { GetValorationsByUserModel } from "../models/valoration.model";

export class GetValorationsByUserUseCase {
  constructor(private readonly valorationRepository: ValorationRepository) {}

  async execute(getValorationsByUserModel: GetValorationsByUserModel): Promise<ValorationsResponse> {
    return await this.valorationRepository.getValorationsByUser(getValorationsByUserModel);
  }
}