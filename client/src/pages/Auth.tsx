import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import SplashScreen from "@/components/auth/SplashScreen";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Auth() {
  const [showSplash, setShowSplash] = useState(true);
  const [, params] = useRoute("/auth/:step");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  const step = params?.step || "login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="w-full max-w-md px-4">
        {step === "login" && <LoginForm />}
        {step === "signup" && <SignupForm />}
        {step === "reset-password" && <PasswordResetForm />}
      </div>
    </div>
  );
}
