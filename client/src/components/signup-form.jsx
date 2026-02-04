import { useAuth } from "../contexts/AuthContext";
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
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import githubIcon from "@/assets/github-icon.svg";
import googleIcon from "@/assets/google-icon.svg";

export function SignupForm({ ...props }) {
  const { setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value,
          }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        alert(
          data.errors
            ? data.errors.map((err) => err.msg).join("\n")
            : "Signup failed",
        );
        setLoading(false);
        return;
      }

      setToken(data.token);
      setUser(data.user);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred during signup. Please try again.");
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input id="firstName" type="text" placeholder="John" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input id="lastName" type="text" placeholder="Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" placeholder="johndoe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input id="confirmPassword" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <div className="flex flex-col w-full items-center gap-2">
                  <p className="text-gray-600">Or continue with</p>
                  <span className="w-full border-b border-gray-400"></span>
                  <div className="flex gap-2 w-full py-2">
                    <Button variant="outline" className="flex-1">
                      <img
                        width={20}
                        height={20}
                        src={googleIcon}
                        alt="Google"
                      />
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <img
                        width="20"
                        height="20"
                        src={githubIcon}
                        alt="GitHub"
                      />
                    </Button>
                  </div>
                </div>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/signin">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
