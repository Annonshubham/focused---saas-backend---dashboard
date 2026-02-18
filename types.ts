
export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
  createdAt: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export enum AppStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
