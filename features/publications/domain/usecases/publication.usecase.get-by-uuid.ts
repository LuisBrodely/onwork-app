import { PublicationRepository } from "../repositories/publication.repository";
import { PublicationResponse } from "../../data/interfaces/publication.interface";
import { PublicationUuidModel } from "../models/publication.model";

export class GetPublicationByUuidUseCase {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async execute(publicationUuidModel: PublicationUuidModel): Promise<PublicationResponse> {
    return await this.publicationRepository.getPublicationByUuid(publicationUuidModel);
  }
}
