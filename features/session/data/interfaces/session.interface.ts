export interface SessionResponse {
  data: Session;
  message: string;
  success: boolean;
}

export interface Session {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  area: null;
  job: null;
  google_signin: boolean;
  microsoft_signin: boolean;
  active: boolean;
  is_removed: boolean;
  created_by: string;
  updated_by: string;
  deleted_by: null;
  created_at: number;
  updated_at: number;
  deleted_at: null;
  profiles: null;
  team_members: null;
  access_token: string;
  refresh_token: string;
  expires: number;
}