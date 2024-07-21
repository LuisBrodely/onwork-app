import { SessionValidateResponse } from "@/features/session/data/interfaces/session.interface";
import { SessionRepository } from "@/features/session/domain/repositories/session.repository";
import { ValidateTokenModel } from "@/features/session/domain/models/session.model";

export class ValidateTokenUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(validateTokenModel: ValidateTokenModel): Promise<SessionValidateResponse> {
    return await this.sessionRepository.validateToken(validateTokenModel);
  }
}
