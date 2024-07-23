import { OnWorkApi } from "@/shared/config/OnWorkApi";
import { AxiosError } from "axios";
import { TagsResponse } from "@/features/tags/data/interfaces/tags.interface";

// Obtener la lista de tags
export const getTags = async () => {
  try {
    const response = await OnWorkApi.get<TagsResponse>('tags/');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
}

// Eliminar un tag por UUID
export const deleteTag = async (uuid: string) => {
  try {
    const response = await OnWorkApi.delete(`tags/${uuid}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
}
