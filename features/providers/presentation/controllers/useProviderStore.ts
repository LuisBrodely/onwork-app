import { create } from "zustand";
import { ProviderRepositoryImpl } from "@/features/providers/data/repositories/provider.repository.remote";
import { GetProviderUseCase } from "@/features/providers/domain/usecases/provider.usecase.get";
import { Provider } from "@/features/providers/data/interfaces/provider.interface";
import { ProviderRequest } from "@/features/providers/domain/models/provider.model";

const providerRepositoryImpl = new ProviderRepositoryImpl();

const getProviderUseCase = new GetProviderUseCase(providerRepositoryImpl);

interface ProviderState {
  provider: Provider;
  isLoading: boolean;
  error?: Error | null | unknown;

  setIsLoading: (isLoading: boolean) => void;
  setMyProviders: (provider: Provider) => void;

  getProvider: (providerRequest: ProviderRequest) => void;
}

export const useProviderStore = create<ProviderState>((set, get) => ({
  provider: {} as Provider,
  isLoading: false,
  error: null,

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setMyProviders: (provider: Provider) => {
    set({ provider });
  },

  getProvider: async (providerRequest: ProviderRequest) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getProviderUseCase.execute(providerRequest);

      if (response.statusCode) {
        return response.data as Provider[];
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return [];
    } finally {
      setIsLoading(false);
    }
  }
}));