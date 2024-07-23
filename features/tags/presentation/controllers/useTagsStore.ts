import { create } from "zustand";
import { TagRepositoryImpl } from "@/features/tags/data/repositories/tags.repository.remote";
import { GetTagsUseCase } from "@/features/tags/domain/usecases/tags.usecase.get";
import { Tag } from "@/features/tags/data/interfaces/tags.interface";

const tagRepositoryImpl = new TagRepositoryImpl();
const getTagsUseCase = new GetTagsUseCase(tagRepositoryImpl);

interface TagState {
  tags: Tag[];
  isLoading: boolean;
  error?: Error | null | unknown;

  setIsLoading: (isLoading: boolean) => void;
  getTags: () => Promise<Tag[]>;
}

export const useTagStore = create<TagState>((set, get) => ({
  tags: [],
  isLoading: false,
  error: null,

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  getTags: async () => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getTagsUseCase.execute();

      if (response.statusCode) {
        set({ tags: response.data });
        return response.data as Tag[];
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
