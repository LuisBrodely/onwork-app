import { ProviderRepository } from "@/features/providers/domain/repositories/provider.repository";
import { ProvidersResponse } from "@/features/providers/data/interfaces/provider.interface";
import { getProviders } from "@/features/providers/data/datasources/provider.datasource.api";

export class ProviderRepositoryImpl implements ProviderRepository {
  async getProviders(): Promise<ProvidersResponse> {
    return await getProviders()
  }
}