import { ValorationResponse, ValorationSerieResponse, ValorationsResponse } from "../../data/interfaces/valoration.interface";
import { CreateValorationModel, ValorationUuidModel, GetValorationsByProviderModel, GetValorationsByUserModel, GetValorationsSerieByUserModel } from "../models/valoration.model";

export interface ValorationRepository {
  createValoration: (createValorationModel: CreateValorationModel) => Promise<ValorationResponse>;
  deleteValoration: (deleteValorationModel: ValorationUuidModel) => Promise<ValorationResponse>;
  getValorationsByProvider: (getValorationsByProviderModel: GetValorationsByProviderModel) => Promise<ValorationsResponse>;
  getValorationsByUser: (getValorationsByUserModel: GetValorationsByUserModel) => Promise<ValorationsResponse>;
  getValorationsSerieByUser(getValorationsSerieByUserModel: GetValorationsSerieByUserModel): Promise<ValorationSerieResponse>;
}