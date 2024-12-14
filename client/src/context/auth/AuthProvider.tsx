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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user profile when component mounts if token exists
      client<{ user: User }>("/auth/profile")
        .then((response) => {
          setUser(response.user);
        })
        .catch(() => {
          // If token is invalid, clear it
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await client<LoginResponse>("/auth/login", {
        method: "POST",
        body: { email, password }, // Now this will work with our updated api client
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
        body: { email, password }, // Remove JSON.stringify here too
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
