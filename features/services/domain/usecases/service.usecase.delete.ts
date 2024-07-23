import { ServiceRepository } from "../repositories/service.repository";
import { ServiceResponse } from "../../data/interfaces/service.interface";
import { ServiceUuidModel } from "../models/service.model";

export class DeleteServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(deleteServiceModel: ServiceUuidModel): Promise<ServiceResponse> {
    return await this.serviceRepository.deleteService(deleteServiceModel);
  }
}
