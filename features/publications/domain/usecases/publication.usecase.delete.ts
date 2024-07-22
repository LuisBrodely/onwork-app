import { PublicationRepository } from "../repositories/publication.repository";
import { PublicationBoolResponse } from "../../data/interfaces/publication.interface";
import { PublicationUuidModel } from "../models/publication.model";

export class DeletePublicationUseCase {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async execute(deletePublicationModel: PublicationUuidModel): Promise<PublicationBoolResponse> {
    return await this.publicationRepository.deletePublication(deletePublicationModel);
  }
}
