import { SessionResponse } from "@/features/session/data/interfaces/session.interface";
import { SignInModel, SignOutModel, ActivateModel } from "@/features/session/domain/models/session.model";

export interface SessionRepository {
  signIn: (singInModel: SignInModel) => Promise<SessionResponse>;
  sigOut: (signOutModel: SignOutModel) => Promise<SessionResponse>;
  activate: (activateModel: ActivateModel) => Promise<SessionResponse>;
}
