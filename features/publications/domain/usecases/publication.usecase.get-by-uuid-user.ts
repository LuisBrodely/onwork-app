import { PublicationRepository } from "../repositories/publication.repository";
import { PublicationsResponse } from "../../data/interfaces/publication.interface";
import { GetPublicationsByUserModel } from "../models/publication.model";

export class GetPublicationsByUserUseCase {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async execute(getPublicationsByUserModel: GetPublicationsByUserModel): Promise<PublicationsResponse> {
    return await this.publicationRepository.getPublicationsByUser(getPublicationsByUserModel);
  }
}
