import { ValorationRepository } from "../../domain/repositories/valoration.repository";
import { CreateValorationModel, ValorationUuidModel, GetValorationsByProviderModel, GetValorationsByUserModel, GetValorationsSerieByUserModel } from "../../domain/models/valoration.model";
import { ValorationResponse, ValorationSerieResponse, ValorationsResponse } from "../interfaces/valoration.interface";
import { createValoration, deleteValoration, getValorationsByProvider, getValorationsByUser, getValorationsSerieByUser } from '../datasources/valoration.datasource.api';

export class ValorationRepositoryImpl implements ValorationRepository {
  async createValoration(createValorationModel: CreateValorationModel): Promise<ValorationResponse> {
    return await createValoration(createValorationModel);
  }

  async deleteValoration(deleteValorationModel: ValorationUuidModel): Promise<ValorationResponse> {
    return await deleteValoration(deleteValorationModel);
  }

  async getValorationsByProvider(getValorationsByProviderModel: GetValorationsByProviderModel): Promise<ValorationsResponse> {
    return await getValorationsByProvider(getValorationsByProviderModel);
  }

  async getValorationsByUser(getValorationsByUserModel: GetValorationsByUserModel): Promise<ValorationsResponse> {
    return await getValorationsByUser(getValorationsByUserModel);
  }

  async getValorationsSerieByUser(getValorationsSerieByUserModel: GetValorationsSerieByUserModel): Promise<ValorationSerieResponse> {
    return await getValorationsSerieByUser(getValorationsSerieByUserModel);
  }

}