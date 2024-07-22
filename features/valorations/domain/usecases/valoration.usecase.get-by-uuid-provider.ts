import { ValorationRepository } from "../repositories/valoration.repository";
import { ValorationsResponse } from "../../data/interfaces/valoration.interface";
import { GetValorationsByProviderModel } from "../models/valoration.model";

export class GetValorationsByProviderUseCase {
  constructor(private readonly valorationRepository: ValorationRepository) {}

  async execute(getValorationsByProviderModel: GetValorationsByProviderModel): Promise<ValorationsResponse> {
    return await this.valorationRepository.getValorationsByProvider(getValorationsByProviderModel);
  }
}