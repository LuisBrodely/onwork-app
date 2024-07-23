export interface ServiceResponse {
  data: Service;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface ServicesResponse {
  data: Service[];
  message: string;
  success: boolean;
  statusCode: number;
}

export interface Service {
  uuid: string;
  name: string;
  cost_total: number;
  currency: string;
}
