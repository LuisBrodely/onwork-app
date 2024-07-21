import { SessionCreateResponse } from "@/features/session/data/interfaces/session.interface";
import { SessionRepository } from "@/features/session/domain/repositories/session.repository";
import { SignUpModel } from "@/features/session/domain/models/session.model";

export class SignUpUseCase {
  constructor(private readonly sessionRepository: SessionRepository) { }

  async execute(signUpModel: SignUpModel): Promise<SessionCreateResponse> {
    return await this.sessionRepository.signUp(signUpModel);
  }
}