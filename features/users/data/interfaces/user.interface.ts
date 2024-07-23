export interface UserResponse {
  data:       User;
  message:    string;
  success:    boolean;
  statusCode: number;
}

export interface UsersResponse {
  data:       User[];
  message:    string;
  success:    boolean;
  statusCode: number;
}

export interface User {
  tags:        Tag[];
  uuid:        string;
  name:        string;
  email:       string;
  lastName:    string;
  phoneNumber: string;
  birthday:    Date;
  region:      string;
  plan:        string;
  role:        string;
  latitude:    number;
  longitude:   number;
  description: string;
  company:     string;
  image_url:   string;
}

export interface Tag {
  uuid:        string;
  title:       string;
  description: string;
}
