import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  mode: "login" | "register";
  className?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, className }) => {
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Define schemas for login and register
  const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
  });

  const registerSchema = loginSchema
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  // Use appropriate schema based on mode
  const formSchema = mode === "register" ? registerSchema : loginSchema;
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "register" ? { confirmPassword: "" } : {}),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (mode === "login") {
        await login({ email: values.email, password: values.password });
        // After successful login, navigate to dashboard
        navigate("/dashboard");
      } else {
        const registerValues = values as z.infer<typeof registerSchema>;
        await register({
          email: registerValues.email,
          password: registerValues.password,
          confirmPassword: registerValues.confirmPassword,
        });
        // After successful registration, show success message and navigate to login
        toast({
          title: "Registration successful",
          description: "Please login with your new account",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Authentication failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center space-y-0.5">
          <CardTitle className="text-xl font-bold">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Login to your medivault account"
              : "Enter your information to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      {mode === "login" && (
                        <a
                          href="#"
                          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      )}
                    </div>
                    <FormControl>
                      <Input type="password" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {mode === "register" && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "login" ? "Login" : "Create account"}
              </Button>
              <div className="text-center text-sm">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <Button
                      variant="link"
                      className="px-0.25 font-normal underline"
                      onClick={() => navigate("/register")}
                      disabled={loading}
                      type="button"
                    >
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      className="px-1 font-normal"
                      onClick={() => navigate("/login")}
                      disabled={loading}
                      type="button"
                    >
                      Sign in
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
