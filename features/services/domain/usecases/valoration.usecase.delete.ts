import { ValorationRepository } from "../repositories/valoration.repository";
import { ValorationResponse } from "../../data/interfaces/valoration.interface";
import { ValorationUuidModel } from "../models/valoration.model";

export class DeleteValorationUseCase {
  constructor(private readonly valorationRepository: ValorationRepository) {}

  async execute(deleteValorationModel: ValorationUuidModel): Promise<ValorationResponse> {
    return await this.valorationRepository.deleteValoration(deleteValorationModel);
  }
}