  import { PublicationBoolResponse, PublicationResponse, PublicationsResponse } from "../../data/interfaces/publication.interface";
  import { CreatePublicationModel, PublicationUuidModel, GetPublicationsByUserModel } from "../models/publication.model";

  export interface PublicationRepository {
    createPublication: (createPublicationModel: CreatePublicationModel) => Promise<PublicationResponse>;
    getPublicationsByUser: (getPublicationsByUserModel: GetPublicationsByUserModel) => Promise<PublicationsResponse>;
    getPublicationByUuid: (getPublicationByUuidModel: PublicationUuidModel) => Promise<PublicationResponse>;
    deletePublication: (deletePublicationModel: PublicationUuidModel) => Promise<PublicationBoolResponse>;
  }
