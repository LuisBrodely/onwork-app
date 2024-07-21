import { create } from "zustand";
import { SignInUseCase } from "@/features/session/domain/usecases/session.usecase.sign-in";
import { SignOutUseCase } from "@/features/session/domain/usecases/session.usecase.sign-out";
import { ActivateUseCase } from "@/features/session/domain/usecases/session.usecase.activate";
import { SessionRepositoryImpl } from "@/features/session/data/repositories/session.repository.remote";
import {
  SignInModel,
  SignOutModel,
  ActivateModel,
} from "@/features/session/domain/models/session.model";

import { StorageAdapter } from "@/shared/adapters/StorageAdapter";
import { User } from "../../data/interfaces/session.interface";
import { Alert } from "react-native";
import { ValidateTokenUseCase } from "../../domain/usecases/session.usecase.validate-token";

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
  user: User | null;
}

const sessionRepositoryImpl = new SessionRepositoryImpl();

const signInUseCase = new SignInUseCase(sessionRepositoryImpl);
const signOutUseCase = new SignOutUseCase(sessionRepositoryImpl);
const activateUseCase = new ActivateUseCase(sessionRepositoryImpl);
const validateTokenUseCase = new ValidateTokenUseCase(sessionRepositoryImpl);

export const useSessionStore = create<SessionState>()((set, get) => ({
  status: SessionStatus.CHECKING,
  user: null,

  signIn: async (signInModel: SignInModel) => {
    try {
      const response = await signInUseCase.execute(signInModel);

      if (response.success) {
        await StorageAdapter.setItem("token", response.data.jwt_token);
        set({ user: response.data.user, status: SessionStatus.AUTHENTICATED });
        return true
      } 
      return false;
    } catch (error) {
      return false;
    }
  },

  signOut: async (signOutModel: SignOutModel) => {
    try {
      const response = await signOutUseCase.execute(signOutModel);

      if (response.success) {
        await StorageAdapter.removeItem("token");
        set({ user: null, status: SessionStatus.UNAUTHENTICATED });
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while trying to sign out");
    }
  },

  validateToken: async () => {
    try {
      const token = await StorageAdapter.getItem("token");

      if (!token) {
        set({ status: SessionStatus.UNAUTHENTICATED });
        return;
      }

      const response = await validateTokenUseCase.execute({ token });

      console.log("VALIDATE SESSION =>  ", response);

      if (response.success) {
        set({ user: response.data.user, status: SessionStatus.AUTHENTICATED });
      } else {
        set({ status: SessionStatus.UNAUTHENTICATED });
      }
    } catch (error) {
      set({ status: SessionStatus.UNAUTHENTICATED });
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

}));
