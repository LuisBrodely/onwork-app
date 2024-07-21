import { SessionResponse, SessionValidateResponse, SessionCreateResponse } from "@/features/session/data/interfaces/session.interface";
import { SignInModel, SignOutModel, ActivateModel, ValidateTokenModel, SignUpModel } from "@/features/session/domain/models/session.model";

export interface SessionRepository {
  signIn: (singInModel: SignInModel) => Promise<SessionResponse>;
  sigOut: (signOutModel: SignOutModel) => Promise<SessionResponse>;
  activate: (activateModel: ActivateModel) => Promise<SessionResponse>;
  validateToken: (validateTokenModel: ValidateTokenModel) => Promise<SessionValidateResponse>;
  signUp: (signUpModel: SignUpModel) => Promise<SessionCreateResponse>;

}
