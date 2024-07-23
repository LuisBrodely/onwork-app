import { TagRepository } from "@/features/tags/domain/repositories/tags.repository";
import { TagsResponse } from "@/features/tags/data/interfaces/tags.interface";
import { getTags, deleteTag } from "@/features/tags/data/datasources/tags.datasourc.api";

export class TagRepositoryImpl implements TagRepository {
  async getTags(): Promise<TagsResponse> {
    return await getTags();
  }

  async deleteTag(uuid: string): Promise<void> {
    return await deleteTag(uuid);
  }
}
