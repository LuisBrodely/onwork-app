import { create } from "zustand";
import { UserRepositoryImpl } from "../../data/repositories/user.repository.remote";
import { GetUserByUuidUseCase } from "../../domain/usecases/user.usecase.get-by-uuid";
import { UpdateUserUseCase } from "../../domain/usecases/user.usecase.update";
import { UpdateUserPasswordUseCase } from "../../domain/usecases/user.usecase.update-password";
import { User } from "../../data/interfaces/user.interface";
import { UserUuidModel, UserUpdateModel, UserUpdatePasswordModel, UserUpdateRoleModel } from "../../domain/models/user.model";
import { GetUsersUseCase } from "../../domain/usecases/user.usecase.get";
import { UpdateUserRoleUseCase } from "../../domain/usecases/user.usecase.update-role";

const userRepository = new UserRepositoryImpl();

const getUsersUseCase = new GetUsersUseCase(userRepository);
const getUserByUuidUseCase = new GetUserByUuidUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(userRepository);
const updateUserRoleUseCase = new UpdateUserRoleUseCase(userRepository);

interface UserState {
  isLoading: boolean;
  error?: Error | null | unknown;

  setIsLoading: (isLoading: boolean) => void;

  getUsers: () => Promise<User[]>;
  getUserByUuid: (userUuidModel: UserUuidModel) => Promise<User | null>;
  updateUser: (userUpdateModel: UserUpdateModel) => Promise<boolean>;
  updateUserRole: (userUpdateRoleModel: UserUpdateRoleModel) => Promise<boolean>;
  updateUserPassword: (userUpdatePasswordModel: UserUpdatePasswordModel) => Promise<boolean>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  getUsers: async () => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getUsersUseCase.execute();

      if (response.success) {
        return response.data as User[];
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return [];
    } finally {
      setIsLoading(false);
    }
  },

  getUserByUuid: async (userUuidModel: UserUuidModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await getUserByUuidUseCase.execute(userUuidModel);

      if (response.success) {
        return response.data as User;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return null;
    } finally {
      setIsLoading(false);
    }
  },

  updateUserRole: async (userUpdateRoleModel: UserUpdateRoleModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await updateUserRoleUseCase.execute(userUpdateRoleModel);

      if (response.success) {
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return false;
    } finally {
      setIsLoading(false);
    }
  },

  updateUser: async (userUpdateModel: UserUpdateModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await updateUserUseCase.execute(userUpdateModel);

      if (response.success) {
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return false;
    } finally {
      setIsLoading(false);
    }
  },

  updateUserPassword: async (userUpdatePasswordModel: UserUpdatePasswordModel) => {
    const { setIsLoading } = get();
    try {
      setIsLoading(true);
      const response = await updateUserPasswordUseCase.execute(userUpdatePasswordModel);

      if (response.success) {
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      set({ error });
      return false;
    } finally {
      setIsLoading(false);
    }
  },
}));