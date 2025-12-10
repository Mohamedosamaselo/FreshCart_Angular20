import { User } from './User';

export interface SignUpResponse {
  message: string;
  user: User;
  token: string;
}
