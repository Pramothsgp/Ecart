import { JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  user: string ,
  iat : number,
  exp : number
}
 export interface User {
    id: number;
    username: string;
    email: string;
    name?: string;
    image?: string;
  };

export interface AuthContextType {
  user: User | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
