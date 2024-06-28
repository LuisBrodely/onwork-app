import { create } from "zustand";
import { SignInUseCase } from "@/features/session/domain/usecases/session.usecase.sign-in";
import { SignOutUseCase } from "@/features/session/domain/usecases/session.usecase.sign-out";
import { ActivateUseCase } from "@/features/session/domain/usecases/session.usecase.activate";
import { SessionRepositoryImpl } from "@/features/session/data/repositories/session.repository.remote";
import { SignInModel, SignOutModel, ActivateModel } from "@/features/session/domain/models/session.model";

import { StorageAdapter } from "@/shared/adapters/StorageAdapter";

export enum SessionStatus {
  CHECKING = "checking",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

export interface SessionState {
  signIn: (sigInModel: SignInModel) => Promise<boolean>;
  signOut: (signOutModel: SignOutModel) => Promise<void>;
  activate: (activateModel: ActivateModel) => Promise<boolean>;

  validateToken: () => void;

  status: SessionStatus;
  setStatus: (status: SessionStatus) => void;
  user?: any
}

const sessionRepositoryImpl = new SessionRepositoryImpl();

const signInUseCase = new SignInUseCase(sessionRepositoryImpl);
const signOutUseCase = new SignOutUseCase(sessionRepositoryImpl);
const activateUseCase = new ActivateUseCase(sessionRepositoryImpl);

export const useSessionStore = create<SessionState>()((set, get) => ({
  status: SessionStatus.AUTHENTICATED,
  user: null,
  signIn: async (signInModel: SignInModel) => {
    try {
      const response = await signInUseCase.execute(signInModel);

      return true
    } catch (error) {
      return false;
    }
  },
  signOut: async (signOutModel: SignOutModel) => {
    try {
      const response = await signOutUseCase.execute(signOutModel);

      await StorageAdapter.removeItem("token");
      await StorageAdapter.removeItem("user");


    } catch (error) {
      console.log(error);
    }
  },
  activate: async (activateModel: ActivateModel) => {
    try {
      const response = await activateUseCase.execute(activateModel);
      return true;
    } catch (error) {
      return false;
    }
  },
  setStatus: (status: SessionStatus) => {
    set({ status });
  },
  validateToken: async () => {
    
  },
}));
