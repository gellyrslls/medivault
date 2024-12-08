import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    await login(values.email, values.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthForm mode="login" onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
