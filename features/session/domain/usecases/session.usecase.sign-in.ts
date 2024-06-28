import { SessionResponse } from "@/features/session/data/interfaces/session.interface";
import { SessionRepository } from "@/features/session/domain/repositories/session.repository";
import { SignInModel } from "@/features/session/domain/models/session.model";

export class SignInUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(signInModel: SignInModel): Promise<SessionResponse> {
    return await this.sessionRepository.signIn(signInModel);
  }
}
