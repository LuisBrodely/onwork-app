import { create } from "zustand";
import { ProviderRepositoryImpl } from "@/features/providers/data/repositories/provider.repository.remote";
import { GetProvidersUseCase } from "@/features/providers/domain/usecases/provider.usecase.get";
import { Provider } from "@/features/providers/data/interfaces/provider.interface";

const providerRepositoryImpl = new ProviderRepositoryImpl();
const getProvidersUseCase = new GetProvidersUseCase(providerRepositoryImpl);

interface ProviderState {
  providers: Provider[];
  isLoading: boolean;

  selectedUuidProvider: string | null;
  setSelectedUuidProvider: (uuid: string) => void;

  error?: Error | null | unknown;

  setIsLoading: (isLoading: boolean) => void;
  getProviders: () => Promise<Provider[]>;
}

export const useProviderStore = create<ProviderState>((set, get) => ({
  providers: [],
  selectedUuidProvider: null,
  isLoading: false,
  error: null,

  setSelectedUuidProvider: (uuid: string) => {
    set({ selectedUuidProvider: uuid });
  },

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  getProviders: async () => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getProvidersUseCase.execute();

      if (response.statusCode) {
        set({ providers: response.data });
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
  },
}));
