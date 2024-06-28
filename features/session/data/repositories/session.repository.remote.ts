import { SessionResponse } from "@/features/session/data/interfaces/session.interface";
import { SessionRepository } from '@/features/session/domain/repositories/session.repository';
import { SignInModel, SignOutModel, ActivateModel } from "@/features/session/domain/models/session.model";
import { singIn, signOut, activate } from '@/features/session/data/datasources/session.datasource.api';

export class SessionRepositoryImpl implements SessionRepository {
  async signIn(signInModel: SignInModel): Promise<SessionResponse> {
    return await singIn(signInModel);
  }

  async sigOut(signOutModel: SignOutModel): Promise<SessionResponse> {
    return await signOut(signOutModel);
  }

  async activate(activateModel: ActivateModel): Promise<SessionResponse> {
    return await activate(activateModel);
  }
}