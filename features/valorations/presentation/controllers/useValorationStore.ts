import { create } from "zustand";
import { ValorationRepositoryImpl } from "../../data/repositories/valoration.repository.remote";
import { CreateValorationUseCase } from "../../domain/usecases/valoration.usecase.create";
import { GetValorationsByProviderUseCase } from "../../domain/usecases/valoration.usecase.get-by-uuid-provider";
import { DeleteValorationUseCase } from "../../domain/usecases/valoration.usecase.delete";
import { GetValorationsSerieByUserUseCase } from "../../domain/usecases/valoration.usecase.get-series";
import {
  CreateValorationModel,
  ValorationUuidModel,
  GetValorationsByProviderModel,
  GetValorationsByUserModel,
  GetValorationsSerieByUserModel
} from "../../domain/models/valoration.model";
import { Valoration, DataTime } from "../../data/interfaces/valoration.interface";

const valorationRepository = new ValorationRepositoryImpl();

const createValorationUseCase = new CreateValorationUseCase(valorationRepository);
const getValorationsByProviderUseCase = new GetValorationsByProviderUseCase(valorationRepository);
const deleteValorationUseCase = new DeleteValorationUseCase(valorationRepository);
const getValorationsSerieByUserUseCase = new GetValorationsSerieByUserUseCase(valorationRepository);

interface ValorationState {
  myValorations: Valoration[];
  isLoading: boolean;
  error?: Error | null | unknown;
  myValorationsSerie: DataTime[];
  setIsLoading: (isLoading: boolean) => void;
  setMyValorations: (valorations: Valoration[]) => void;
  createValoration: (valoration: CreateValorationModel) => Promise<boolean>;
  getValorationsByProvider: (providerModel: GetValorationsByProviderModel) => Promise<Valoration[]>;
  getValorationsByUser: (userModel: GetValorationsByUserModel) => Promise<Valoration[]>;
  deleteValoration: (uuidModel: ValorationUuidModel) => Promise<boolean>;
  getValorationsSerieByUserUseCase: (getValorationsSerieByUserModel: GetValorationsSerieByUserModel) => Promise<DataTime[]>;
}

export const useValorationStore = create<ValorationState>((set, get) => ({
  myValorations: [],
  myValorationsSerie: [],
  isLoading: false,
  error: null,

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
  setMyValorations: (myValorations: Valoration[]) => {
    set({ myValorations });
  },
  setMyValorationsSerie: (myValorationsSerie: DataTime[]) => {
    set({ myValorationsSerie });
  },

  createValoration: async (valoration: CreateValorationModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await createValorationUseCase.execute(valoration);

      if (response.status) {
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return false;
    } finally {
      setIsLoading(false);
    }
  },

  getValorationsByProvider: async (providerModel: GetValorationsByProviderModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getValorationsByProviderUseCase.execute(providerModel);

      if (response.status) {
        return response.data as Valoration[];
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

  getValorationsByUser: async (userModel: GetValorationsByUserModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getValorationsByProviderUseCase.execute(userModel);

      if (response.status) {
        return response.data as Valoration[];
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

  deleteValoration: async (uuidModel: ValorationUuidModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await deleteValorationUseCase.execute(uuidModel);

      if (response.status) {
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return false;
    } finally {
      setIsLoading(false);
    }
  },

  getValorationsSerieByUserUseCase: async (getValorationsSerieByUserModel: GetValorationsSerieByUserModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getValorationsSerieByUserUseCase.execute(getValorationsSerieByUserModel);

      if (response.status) {
        return response.data
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
