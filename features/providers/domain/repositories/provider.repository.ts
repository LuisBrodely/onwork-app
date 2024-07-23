import { ProvidersResponse } from "@/features/providers/data/interfaces/provider.interface";

export interface ProviderRepository {
  getProviders(): Promise<ProvidersResponse>;
}