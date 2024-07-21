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