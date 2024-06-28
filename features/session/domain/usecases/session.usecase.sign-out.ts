import { SessionResponse } from "@/features/session/data/interfaces/session.interface";
import { SessionRepository } from "@/features/session/domain/repositories/session.repository";
import { SignOutModel } from "@/features/session/domain/models/session.model";

export class SignOutUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(signOutModel: SignOutModel): Promise<SessionResponse> {
    return await this.sessionRepository.sigOut(signOutModel);
  }
}
