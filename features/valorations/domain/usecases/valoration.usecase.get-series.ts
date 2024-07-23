import { ValorationRepository } from "../repositories/valoration.repository";
import { ValorationSerieResponse } from "../../data/interfaces/valoration.interface";
import { GetValorationsSerieByUserModel } from "../models/valoration.model";

export class GetValorationsSerieByUserUseCase {
  constructor(private readonly valorationRepository: ValorationRepository) { }

  async execute(getValorationsSerieByUserModel: GetValorationsSerieByUserModel): Promise<ValorationSerieResponse> {
    return await this.valorationRepository.getValorationsSerieByUser(getValorationsSerieByUserModel);
  }
}