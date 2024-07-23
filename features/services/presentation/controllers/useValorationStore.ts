import { create } from "zustand";
import { ServiceRepositoryImpl } from "../../data/repositories/service.repository.remote";
import { CreateServiceUseCase } from "../../domain/usecases/service.usecase.create";
import { GetServicesByProviderUseCase } from "../../domain/usecases/service.usecase.get-by-uuid-provider";
import { DeleteServiceUseCase } from "../../domain/usecases/service.usecase.delete";
import { 
  CreateServiceModel, 
  ServiceUuidModel, 
  GetServicesByProviderModel 
} from "../../domain/models/service.model";
import { Service } from "../../data/interfaces/service.interface";
import { GetServiceByUuidUseCase } from "../../domain/usecases/service.usecase.get-by-uuid";

const serviceRepository = new ServiceRepositoryImpl();

const createServiceUseCase = new CreateServiceUseCase(serviceRepository);
const getServicesByProviderUseCase = new GetServicesByProviderUseCase(serviceRepository);
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository);
const getServiceByUuidUseCase = new GetServiceByUuidUseCase(serviceRepository);

interface ServiceState {
  myServices: Service[];
  isLoading: boolean;
  error?: Error | null | unknown;

  setIsLoading: (isLoading: boolean) => void;
  setMyServices: (services: Service[]) => void;

  createService: (service: CreateServiceModel) => Promise<boolean>;
  getServicesByProvider: (providerModel: GetServicesByProviderModel) => Promise<Service[]>;
  getServiceByUuid: (uuidModel: ServiceUuidModel) => Promise<Service>;
  deleteService: (uuidModel: ServiceUuidModel) => Promise<boolean>;
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  myServices: [],
  isLoading: false,
  error: null,

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
  setMyServices: (myServices: Service[]) => {
    set({ myServices });
  },

  createService: async (service: CreateServiceModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await createServiceUseCase.execute(service);

      if (response.success) {
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

  getServicesByProvider: async (providerModel: GetServicesByProviderModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getServicesByProviderUseCase.execute(providerModel);

      if (response.success) {
        return response.data as Service[];
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

  getServiceByUuid: async (uuidModel: ServiceUuidModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getServiceByUuidUseCase.execute(uuidModel);

      if (response.success) {
        return response.data as Service;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return {} as Service;
    } finally {
      setIsLoading(false);
    }
  },

  deleteService: async (uuidModel: ServiceUuidModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await deleteServiceUseCase.execute(uuidModel);

      if (response.success) {
        const updatedServices = await getServicesByProviderUseCase.execute({ uuid: uuidModel.uuid });
        set({ myServices: updatedServices.data });
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
}));