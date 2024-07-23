import { ServiceRepository } from "../repositories/service.repository";
import { ServiceResponse } from "../../data/interfaces/service.interface";
import { ServiceUuidModel } from "../models/service.model";

export class GetServiceByUuidUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(getServiceByUuidModel: ServiceUuidModel): Promise<ServiceResponse> {
    return await this.serviceRepository.getServiceByUuid(getServiceByUuidModel);
  }
}