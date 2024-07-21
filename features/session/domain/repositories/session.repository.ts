import { SessionResponse } from "@/features/session/data/interfaces/session.interface";
import { SignInModel, SignOutModel, ActivateModel, ValidateTokenModel } from "@/features/session/domain/models/session.model";

export interface SessionRepository {
  signIn: (singInModel: SignInModel) => Promise<SessionResponse>;
  sigOut: (signOutModel: SignOutModel) => Promise<SessionResponse>;
  activate: (activateModel: ActivateModel) => Promise<SessionResponse>;
  validateToken: (validateTokenModel: ValidateTokenModel) => Promise<SessionResponse>;
}
