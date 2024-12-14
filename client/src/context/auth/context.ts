import { createContext } from "react";

interface User {
  id: number;
  email: string;
}

// Create an error type instead of using 'any'
interface AuthError {
  message: string;
  code?: string | number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: AuthError }>;
  register: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: AuthError }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
