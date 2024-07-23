export interface CreateValorationModel {
  user_uuid: string;
  provider_uuid: string;
  rating: number;
  comment: string;
}

export interface GetValorationsByProviderModel {
  uuid: string;
}

export interface GetValorationsByUserModel {
  uuid: string;
}

export interface ValorationUuidModel {
  uuid: string;
}

export interface GetValorationsSerieByUserModel {
  uuid: string;
  days: number
}