import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { client } from "@/lib/api";

interface User {
  id: number;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to check auth status
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      // Try to get user profile
      const response = await client<User>("/auth/profile");
      setUser(response);
    } catch (error) {
      console.error("Auth check failed:", error);
      // Clear invalid token
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check auth status when component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await client<LoginResponse>("/auth/login", {
        method: "POST",
        body: { email, password },
      });

      localStorage.setItem("token", response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : "Login failed",
        },
      };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await client<RegisterResponse>("/auth/register", {
        method: "POST",
        body: { email, password },
      });

      localStorage.setItem("token", response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : "Registration failed",
        },
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}