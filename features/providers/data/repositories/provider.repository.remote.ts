import { ProviderRepository } from "@/features/providers/domain/repositories/provider.repository";
import { ProviderRequest } from "@/features/providers/domain/models/provider.model";
import { ProviderResponse } from "@/features/providers/data/interfaces/provider.interface";
import { getProviders } from "@/features/providers/data/datasources/provider.datasource.api";

export class ProviderRepositoryImpl implements ProviderRepository {
  async getProviders(ProviderRequest: ProviderRequest): Promise<ProviderResponse> {
    return await getProviders(ProviderRequest)
  }
}