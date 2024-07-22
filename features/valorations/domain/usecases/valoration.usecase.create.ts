import { ValorationRepository } from "../repositories/valoration.repository";
import { ValorationResponse } from "../../data/interfaces/valoration.interface";
import { CreateValorationModel } from "../models/valoration.model";

export class CreateValorationUseCase {
  constructor(private readonly valorationRepository: ValorationRepository) {}

  async execute(createValorationModel: CreateValorationModel): Promise<ValorationResponse> {
    return await this.valorationRepository.createValoration(createValorationModel);
  }
}