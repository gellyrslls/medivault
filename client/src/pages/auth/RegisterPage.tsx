import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    await register(values.email, values.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthForm mode="register" onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;
