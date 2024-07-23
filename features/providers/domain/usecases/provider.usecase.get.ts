import { ProviderResponse } from "@/features/providers/data/interfaces/provider.interface";
import { ProviderRequest } from "@/features/providers/domain/models/provider.model";
import { ProviderRepository } from "@/features/providers/domain/repositories/provider.repository";

export class GetProviderUseCase {
  constructor(private readonly providerRepository: ProviderRepository) { }

  async execute(providerRequest: ProviderRequest): Promise<ProviderResponse> {
    return await this.providerRepository.getProviders(providerRequest);
  }
}