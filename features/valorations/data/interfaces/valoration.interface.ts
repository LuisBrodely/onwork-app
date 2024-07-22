export interface ValorationResponse {
  data:        Valoration;
  message:     string;
  status:      boolean;
  status_code: number;
}

export interface ValorationsResponse {
  data:        Valoration[];
  message:     string;
  status:      boolean;
  status_code: number;
}

export interface Valoration {
  uuid:           string;
  rating:         number;
  comment:        string;
  general_review: string;
  user_uuid:      string;
  provider_uuid:  string;
  createdAt:      Date;
  updatedAt:      Date;
}
