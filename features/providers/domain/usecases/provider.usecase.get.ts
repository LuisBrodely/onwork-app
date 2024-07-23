import { ProviderRepository } from "@/features/providers/domain/repositories/provider.repository";
import { ProvidersResponse } from "../../data/interfaces/provider.interface";

export class GetProvidersUseCase {
  constructor(private readonly providerRepository: ProviderRepository) { }

  async execute(): Promise<ProvidersResponse> {
    return await this.providerRepository.getProviders();
  }
}