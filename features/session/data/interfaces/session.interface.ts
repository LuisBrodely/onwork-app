export interface SessionResponse {
  data: Data;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface SessionValidateResponse {
  data: User;
  message: string;
  success: boolean;
  statusCode: number;
}


export interface SessionCreateResponse {
  data: CreatedUser;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface CreatedUser {
  uuid: string;
  name: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  birthday: Date;
  region: string;
  token: string;
}

export interface Data {
  uuid: string;
  user: User;
  jwt_token: string;
}

export interface User {
  tags: Tag[];
  uuid: string;
  name: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  birthday: Date;
  region: string;
  plan: string;
  role: string;
  latitude: number;
  longitude: number;
  description: string;
  company: string;
}

export interface Tag {
  uuid: string;
  title: string;
  description: string;
}
