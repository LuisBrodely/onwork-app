import { ProviderResponse } from "@/features/providers/data/interfaces/provider.interface";
import { ProviderRequest } from "@/features/providers/domain/models/provider.model";

export interface ProviderRepository {
  getProviders(request: ProviderRequest): Promise<ProviderResponse>;
}