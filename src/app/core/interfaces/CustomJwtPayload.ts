import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  userId?: string;
  email?: string;
  role?: string;
}
