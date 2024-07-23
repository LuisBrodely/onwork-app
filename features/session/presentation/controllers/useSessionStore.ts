import { create } from "zustand";
import { SignInUseCase } from "@/features/session/domain/usecases/session.usecase.sign-in";
import { SignOutUseCase } from "@/features/session/domain/usecases/session.usecase.sign-out";
import { SignUpUseCase } from "@/features/session/domain/usecases/session.usecase.sign-up";
import { ActivateUseCase } from "@/features/session/domain/usecases/session.usecase.activate";
import { SessionRepositoryImpl } from "@/features/session/data/repositories/session.repository.remote";
import {
  SignInModel,
  SignOutModel,
  ActivateModel,
  SignUpModel,
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
  activate: (activateModel: ActivateModel) => Promise<boolean>;
  validateToken: () => void;
  signOut: () => Promise<void>;
  signUp: (signUpModel: SignUpModel) => Promise<boolean>;
  status: SessionStatus;
  setUser: (user: User) => void;
  user: User | null;
}

const sessionRepositoryImpl = new SessionRepositoryImpl();

const signInUseCase = new SignInUseCase(sessionRepositoryImpl);
const signOutUseCase = new SignOutUseCase(sessionRepositoryImpl);
const signUpUseCase = new SignUpUseCase(sessionRepositoryImpl);
const activateUseCase = new ActivateUseCase(sessionRepositoryImpl);
const validateTokenUseCase = new ValidateTokenUseCase(sessionRepositoryImpl);

export const useSessionStore = create<SessionState>()((set, get) => ({
  status: SessionStatus.CHECKING,
  user: null,

  setUser: (user: User) => {
    set({ user });
  },

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

  signOut: async () => {
    try {
      const token = await StorageAdapter.getItem("token");

      if (!token) {
        set({ status: SessionStatus.UNAUTHENTICATED });
        return;
      }

      const response = await signOutUseCase.execute({
        uuid: get().user?.uuid || "",
        token
      });

      if (response.success) {
        await StorageAdapter.removeItem("token");
        set({ user: null, status: SessionStatus.UNAUTHENTICATED });
      }
    } catch (error) {
      Alert.alert("Error", "A ocurrido un error al cerrar sesión");
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

      if (response.success) {
        set({ user: response.data, status: SessionStatus.AUTHENTICATED });

        console.log('user puesto', response.data);
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

  signUp: async (signUpModel: SignUpModel) => {
    try {
      const response = await signUpUseCase.execute(signUpModel);
      console.log(response.success)
      if (response.success) {
        return true
      }
      return false
    } catch (error) {
      return false;
    }
  },
}));
