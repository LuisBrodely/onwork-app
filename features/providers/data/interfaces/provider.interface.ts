export interface ProviderResponse {
  data: Provider[];
  message: string;
  success: boolean;
  status: number;
}

export interface Provider {
  tags: Tag[];
  uuid: string;
  name: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  birthday: string;
  region: string;
  plan: Plan;
  role: Role;
  latitude: number;
  longitude: number;
  description: string;
  company: string;
  image_url: null | string;
}

export enum Plan {
  Free = "FREE",
}


export enum Role {
  Client = "CLIENT",
  ServiceProvider = "SERVICE_PROVIDER",
}

export interface Tag {
  uuid: string;
  title: string;
  description: string;
}
