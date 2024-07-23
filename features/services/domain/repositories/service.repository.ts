import { ServiceResponse, ServicesResponse } from "../../data/interfaces/service.interface";
import { CreateServiceModel, ServiceUuidModel, GetServicesByProviderModel } from "../models/service.model";

export interface ServiceRepository {
  createService: (createServiceModel: CreateServiceModel) => Promise<ServiceResponse>;
  deleteService: (deleteServiceModel: ServiceUuidModel) => Promise<ServiceResponse>;
  getServicesByProvider: (getServicesByProviderModel: GetServicesByProviderModel) => Promise<ServicesResponse>;
  getServiceByUuid: (getServiceModel: ServiceUuidModel) => Promise<ServiceResponse>;
}