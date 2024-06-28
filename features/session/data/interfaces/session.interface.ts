export interface SessionResponse {
  data:       Data;
  message:    string;
  success:    boolean;
  statusCode: number;
}

export interface Data {
  uuid:      string;
  jwt_token: string;
}