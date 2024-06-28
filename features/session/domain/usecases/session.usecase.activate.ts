import { SessionResponse } from "@/features/session/data/interfaces/session.interface";
import { SessionRepository } from '@/features/session/domain/repositories/session.repository';
import { ActivateModel } from '@/features/session/domain/models/session.model';

export class ActivateUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(activateModel: ActivateModel): Promise<SessionResponse> {
    return await this.sessionRepository.activate(activateModel);
  }
}