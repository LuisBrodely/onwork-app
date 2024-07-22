import { PublicationRepository } from "../../domain/repositories/publication.repository";
import { CreatePublicationModel, PublicationUuidModel, GetPublicationsByUserModel } from "../../domain/models/publication.model";
import { PublicationBoolResponse, PublicationResponse, PublicationsResponse } from "../interfaces/publication.interface";
import { createPublication, getPublicationsByUser, getPublicationByUuid, deletePublication } from "../datasources/publication.datasource.api";

export class PublicationRepositoryImpl implements PublicationRepository {
  async createPublication(createPublicationModel: CreatePublicationModel): Promise<PublicationResponse> {
    return await createPublication(createPublicationModel);
  }

  async getPublicationsByUser(getPublicationsByUserModel: GetPublicationsByUserModel): Promise<PublicationsResponse> {
    return await getPublicationsByUser(getPublicationsByUserModel);
  }

  async getPublicationByUuid(getPublicationByUuidModel: PublicationUuidModel): Promise<PublicationResponse> {
    return await getPublicationByUuid(getPublicationByUuidModel);
  }

  async deletePublication(deletePublicationModel: PublicationUuidModel): Promise<PublicationBoolResponse> {
    return await deletePublication(deletePublicationModel);
  }
}
