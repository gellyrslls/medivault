import { useReducer, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from "./context";
import { authReducer } from "./auth-reducer";
import type { LoginCredentials, RegisterCredentials } from "@/types";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: Boolean(localStorage.getItem("token")),
  isLoading: false,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { toast } = useToast();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: "AUTH_START" });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      localStorage.setItem("token", data.token);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: data.user, token: data.token },
      });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
      throw error;
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      dispatch({ type: "AUTH_START" });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      localStorage.setItem("token", data.token);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: data.user, token: data.token },
      });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    toast({
      description: "Successfully logged out",
    });
  }, [toast]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
