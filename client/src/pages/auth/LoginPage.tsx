import { LoginForm } from "@/components/forms/auth/LoginForm.tsx";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <LoginForm />
    </div>
  );
}
