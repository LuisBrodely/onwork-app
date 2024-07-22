import { ValorationResponse, ValorationsResponse } from "../../data/interfaces/valoration.interface";
import { CreateValorationModel, ValorationUuidModel, GetValorationsByProviderModel } from "../models/valoration.model";

export interface ValorationRepository {
  createValoration: (createValorationModel: CreateValorationModel) => Promise<ValorationResponse>;
  deleteValoration: (deleteValorationModel: ValorationUuidModel) => Promise<ValorationResponse>;
  getValorationsByProvider: (getValorationsByProviderModel: GetValorationsByProviderModel) => Promise<ValorationsResponse>;
}