export interface CreateServiceModel {
  name: string;
  provider_uuid: string;
  currency: string;
  cost_per_service: number;
}

export interface GetServicesByProviderModel {
  uuid: string;
}

export interface ServiceUuidModel {
  uuid: string;
}