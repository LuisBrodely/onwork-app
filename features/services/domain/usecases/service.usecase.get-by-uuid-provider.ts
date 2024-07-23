import { ServiceRepository } from "../repositories/service.repository";
import { ServicesResponse } from "../../data/interfaces/service.interface";
import { GetServicesByProviderModel } from "../models/service.model";

export class GetServicesByProviderUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(getServicesByProviderModel: GetServicesByProviderModel): Promise<ServicesResponse> {
    return await this.serviceRepository.getServicesByProvider(getServicesByProviderModel);
  }
}