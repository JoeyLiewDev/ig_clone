export interface User {
  id: number;
  name: string;
  email: string;
  token_version: number;
  created_at: string;
  updated_at: string;
}

export type registerData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};
