export interface SignInModel {
  email: string;
  password: string;
}

export interface SignOutModel {
  token: string;
  uuid: string;
}

export interface ActivateModel {
  token: string;
  uuid: string;
}

export interface ValidateTokenModel {
  token: string;
}

export interface SignUpModel {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  birthday: string;
  region: string;
}