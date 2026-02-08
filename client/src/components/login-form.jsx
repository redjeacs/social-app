import { useAuth } from "../contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import githubIcon from "@/assets/github-icon.svg";
import googleIcon from "@/assets/google-icon.svg";

export function LoginForm({ className, ...props }) {
  const { setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (error) {
      alert(decodeURIComponent(error));
    }
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        alert(
          data.errors
            ? data.errors.map((err) => err.msg).join("\n")
            : "Signin failed",
        );
        setLoading(false);
        return;
      }

      setToken(data.token);
      setUser(data.user);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error("Signin error:", err);
      alert("An error occurred during signin. Please try again.");
      setLoading(false);
    }
  };

  const handleDemoSignin = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/demo-signin`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.errors
            ? data.errors.map((err) => err.msg).join("\n")
            : "Demo signin failed",
        );
        setLoading(false);
        return;
      }

      setToken(data.token);
      setUser(data.user);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error("Demo signin error:", err);
      alert("An error occurred during demo login. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  const handleGithubSignin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  Login
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleDemoSignin}
                  disabled={loading}
                >
                  Demo Login
                </Button>
                <div className="flex flex-col w-full items-center gap-2">
                  <p className="text-gray-600">Or continue with</p>
                  <span className="w-full border-b border-gray-400"></span>
                  <div className="flex gap-2 w-full py-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignin}
                      className="flex-1"
                    >
                      <img
                        width={20}
                        height={20}
                        src={googleIcon}
                        alt="Google"
                      />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGithubSignin}
                      className="flex-1"
                    >
                      <img
                        width="20"
                        height="20"
                        src={githubIcon}
                        alt="GitHub"
                      />
                    </Button>
                  </div>
                </div>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
