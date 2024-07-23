import { TagRepository } from "@/features/tags/domain/repositories/tags.repository";
import { TagsResponse } from "@/features/tags/data/interfaces/tags.interface";

export class GetTagsUseCase {
  constructor(private readonly tagRepository: TagRepository) { }

  async execute(): Promise<TagsResponse> {
    return await this.tagRepository.getTags();
  }
}