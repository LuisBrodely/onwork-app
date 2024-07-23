import { ServiceRepository } from "../../domain/repositories/service.repository";
import { CreateServiceModel, ServiceUuidModel, GetServicesByProviderModel } from "../../domain/models/service.model";
import { ServiceResponse, ServicesResponse } from "../interfaces/service.interface";
import { createService, deleteService, getServicesByProvider, getServiceByUuid } from '../datasources/service.datasource.api';

export class ServiceRepositoryImpl implements ServiceRepository {
  async createService(createServiceModel: CreateServiceModel): Promise<ServiceResponse> {
    return await createService(createServiceModel);
  }

  async deleteService(deleteServiceModel: ServiceUuidModel): Promise<ServiceResponse> {
    return await deleteService(deleteServiceModel);
  }

  async getServicesByProvider(getServicesByProviderModel: GetServicesByProviderModel): Promise<ServicesResponse> {
    return await getServicesByProvider(getServicesByProviderModel);
  }

  async getServiceByUuid(getServiceModel: ServiceUuidModel): Promise<ServiceResponse> {
    return getServiceByUuid(getServiceModel);
  }
}