import { PublicationRepository } from "../repositories/publication.repository";
import { PublicationResponse } from "../../data/interfaces/publication.interface";
import { CreatePublicationModel } from "../models/publication.model";

export class CreatePublicationUseCase {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async execute(createPublicationModel: CreatePublicationModel): Promise<PublicationResponse> {
    return await this.publicationRepository.createPublication(createPublicationModel);
  }
}