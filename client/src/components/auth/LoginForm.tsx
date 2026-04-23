import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";

export default function LoginForm() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Placeholder for traditional login - in production, implement your auth method
      // For now, redirect to OAuth login
      window.location.href = getLoginUrl();
    } catch (err) {
      setError("Falha ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 border border-border">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <img
            src="/manus-storage/pasted_file_db66k3_image_e35bcb12.png"
            alt="DevSim Studios"
            className="w-16 h-16 object-contain mx-auto"
          />
          <h1 className="text-2xl font-bold text-foreground">DevSim Studios</h1>
          <p className="text-sm text-muted-foreground">Faça login para continuar</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        {/* OAuth Login */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Ou continue com</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => (window.location.href = getLoginUrl())}
        >
          Entrar com OAuth
        </Button>

        {/* Links */}
        <div className="space-y-2 text-center text-sm">
          <p>
            Não tem conta?{" "}
            <button
              type="button"
              onClick={() => setLocation("/auth/signup")}
              className="text-primary hover:underline font-medium"
            >
              Cadastre-se
            </button>
          </p>
          <p>
            <button
              type="button"
              onClick={() => setLocation("/auth/reset-password")}
              className="text-primary hover:underline font-medium"
            >
              Esqueceu sua senha?
            </button>
          </p>
        </div>
      </div>
    </Card>
  );
}
