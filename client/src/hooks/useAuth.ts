import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing auth on mount
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }

        const data: AuthResponse = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }

        const data: AuthResponse = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  return {
    user,
    login,
    register,
    logout,
    loading,
    error,
    isAuthenticated: !!user,
  };
};

export default useAuth;
