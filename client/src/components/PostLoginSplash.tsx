import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function PostLoginSplash() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 25;
        return next >= 100 ? 100 : next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Navigate after splash duration (2.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/my-simulations");
    }, 2500);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="space-y-8 text-center">
        {/* Logo */}
        <div className="animate-bounce">
          <img
            src="/manus-storage/pasted_file_db66k3_image_e35bcb12.png"
            alt="DevSim Studios"
            className="w-24 h-24 object-contain mx-auto"
          />
        </div>

        {/* Welcome Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Bem-vindo{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="text-muted-foreground">Preparando seu simulador...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-border rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className="text-sm text-muted-foreground">{Math.round(Math.min(progress, 100))}%</p>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
      </div>
    </div>
  );
}
