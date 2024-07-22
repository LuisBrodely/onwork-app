import { create } from "zustand";
import { PublicationRepositoryImpl } from "../../data/repositories/publication.repository.remote";
import { CreatePublicationUseCase } from "../../domain/usecases/publication.usecase.create";
import { GetPublicationsByUserUseCase } from "../../domain/usecases/publication.usecase.get-by-uuid-user";
import { GetPublicationByUuidUseCase } from "../../domain/usecases/publication.usecase.get-by-uuid";
import { DeletePublicationUseCase } from "../../domain/usecases/publication.usecase.delete";
import { 
  CreatePublicationModel, 
  PublicationUuidModel, 
  GetPublicationsByUserModel 
} from "../../domain/models/publication.model";
import { Publication } from "../../data/interfaces/publication.interface";

const publicationRepository = new PublicationRepositoryImpl();

const createPublicationUseCase = new CreatePublicationUseCase(publicationRepository);
const getPublicationsByUserUseCase = new GetPublicationsByUserUseCase(publicationRepository);
const getPublicationByUuidUseCase = new GetPublicationByUuidUseCase(publicationRepository);
const deletePublicationUseCase = new DeletePublicationUseCase(publicationRepository);

interface PublicationState {
  myPublications: Publication[];
  isLoading: boolean;
  error?: Error | null | unknown;

  setIsLoading: (isLoading: boolean) => void;
  setMyPublications: (myPublications: Publication[]) => void;

  createPublication: (publication: CreatePublicationModel) => Promise<boolean>;
  getPublicationsByUser: (userModel: GetPublicationsByUserModel) => Promise<Publication[]>;
  getPublicationByUuid: (uuidModel: PublicationUuidModel) => Promise<Publication | null>;
  deletePublication: (uuidModel: PublicationUuidModel) => Promise<boolean>;
}

export const usePublicationStore = create<PublicationState>((set, get) => ({
  myPublications: [],
  isLoading: false,
  error: null,

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
  setMyPublications: (myPublications: Publication[]) => {
    set({ myPublications });
  },

  createPublication: async (publication: CreatePublicationModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await createPublicationUseCase.execute(publication);

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

  getPublicationsByUser: async (userModel: GetPublicationsByUserModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getPublicationsByUserUseCase.execute(userModel);

      if (response.status) {
        return response.data as Publication[];
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

  getPublicationByUuid: async (uuidModel: PublicationUuidModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getPublicationByUuidUseCase.execute(uuidModel);

      if (response.status) {
        return response.data as Publication;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return null;
    } finally {
      setIsLoading(false);
    }
  },

  deletePublication: async (uuidModel: PublicationUuidModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await deletePublicationUseCase.execute(uuidModel);
      
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
}));
