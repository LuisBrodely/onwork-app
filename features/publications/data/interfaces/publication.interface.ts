export interface PublicationsResponse {
  data:        Publication[];
  message:     string;
  status:      boolean;
  status_code: number;
}

export interface PublicationResponse {
  data:        Publication;
  message:     string;
  status:      boolean;
  status_code: number;
}

export interface PublicationBoolResponse {
  data:        boolean;
  message:     string;
  status:      boolean;
  status_code: number;
}

export interface Publication {
  uuid:        string;
  title:       string;
  description: string;
  user_uuid:   string;
  content:     any[];
  comments:    any[];
  url_image:   string;
  createdAt:   Date;
  updatedAt:   Date;
}