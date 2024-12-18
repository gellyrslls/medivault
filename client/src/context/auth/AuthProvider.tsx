import { useReducer, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { api } from "@/lib/api";
import type { LoginCredentials, RegisterCredentials, User } from "@/types";

interface AuthResponse {
  user: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: Boolean(localStorage.getItem("token")),
  isLoading: true,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        if (isMounted) {
          dispatch({ type: "AUTH_ERROR" });
        }
        return;
      }

      try {
        const response = await api.get<{ user: User }>("/auth/me");
        if (isMounted && response.user) {
          dispatch({
            type: "AUTH_SUCCESS",
            payload: { user: response.user, token },
          });
        }
      } catch {
        if (isMounted) {
          localStorage.removeItem("token");
          dispatch({ type: "AUTH_ERROR" });
        }
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch({ type: "AUTH_START" });

        const response = await api.post<AuthResponse>(
          "/auth/login",
          credentials
        );

        const user: User = {
          id: response.user.id,
          email: response.user.email,
          createdAt: response.user.createdAt,
          updatedAt: response.user.updatedAt,
        };

        localStorage.setItem("token", response.token);
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user, token: response.token },
        });
      } catch (error) {
        localStorage.removeItem("token");
        dispatch({ type: "AUTH_ERROR" });

        toast({
          variant: "destructive",
          title: "Login Failed",
          description:
            error instanceof Error ? error.message : "Unable to login",
        });
        throw error;
      }
    },
    [toast]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        dispatch({ type: "AUTH_START" });

        const response = await api.post<AuthResponse>(
          "/auth/register",
          credentials
        );

        const user: User = {
          id: response.user.id,
          email: response.user.email,
          createdAt: response.user.createdAt,
          updatedAt: response.user.updatedAt,
        };

        localStorage.setItem("token", response.token);
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user, token: response.token },
        });
      } catch (error) {
        localStorage.removeItem("token");
        dispatch({ type: "AUTH_ERROR" });

        toast({
          variant: "destructive",
          title: "Registration Failed",
          description:
            error instanceof Error ? error.message : "Unable to register",
        });
        throw error;
      }
    },
    [toast]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    toast({
      description: "Successfully logged out",
    });
  }, [toast]);

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: Boolean(state.user),
    isLoading: state.isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
