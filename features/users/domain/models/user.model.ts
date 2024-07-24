export interface UserUuidModel {
  uuid: string;
}

export interface UserUpdateModel {
  uuid: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  birthday: Date;
  region: string;
}
export enum Role {
  SERVICE_PROVIDER = "SERVICE_PROVIDER",
  CLIENT = "CLIENT",
}

export interface UserUpdateRoleModel {
  uuid: string;
  role: Role;
}

export interface UserUpdatePasswordModel {
  uuid: string;
  password: string;
  newPassword: string;
}

export interface UserUpdateImageModel{
  uuid: string;
  formData: FormData;
}