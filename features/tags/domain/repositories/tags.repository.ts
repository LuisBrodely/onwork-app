import { TagsResponse } from "@/features/tags/data/interfaces/tags.interface";

export interface TagRepository {
  getTags(): Promise<TagsResponse>;
  deleteTag(uuid: string): Promise<void>;
}