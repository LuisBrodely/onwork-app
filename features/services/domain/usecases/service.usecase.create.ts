import { ServiceRepository } from "../repositories/service.repository";
import { ServiceResponse } from "../../data/interfaces/service.interface";
import { CreateServiceModel } from "../models/service.model";

export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(createServiceModel: CreateServiceModel): Promise<ServiceResponse> {
    return await this.serviceRepository.createService(createServiceModel);
  }
}
