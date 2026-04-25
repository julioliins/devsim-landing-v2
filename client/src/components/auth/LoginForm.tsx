import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function LoginForm() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "oauth">("email");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
      setLocation("/splash");
    },
    onError: (error) => {
      setError(error.message || "Falha ao fazer login");
      toast.error(error.message || "Falha ao fazer login");
    },
  });

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email || !password) {
        setError("Por favor, preencha todos os campos");
        setIsLoading(false);
        return;
      }

      await loginMutation.mutateAsync({
        email,
        password,
      });
    } catch (err: any) {
      setError(err.message || "Falha ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = () => {
    window.location.href = getLoginUrl();
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

        {/* Auth Method Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setAuthMethod("email")}
            className={`pb-3 px-4 font-medium text-sm transition-colors ${
              authMethod === "email"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Email & Senha
          </button>
          <button
            onClick={() => setAuthMethod("oauth")}
            className={`pb-3 px-4 font-medium text-sm transition-colors ${
              authMethod === "oauth"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            OAuth
          </button>
        </div>

        {/* Email/Password Form */}
        {authMethod === "email" && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
        )}

        {/* OAuth Login */}
        {authMethod === "oauth" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Faça login com sua conta OAuth
            </p>
            <Button
              type="button"
              variant="default"
              className="w-full"
              onClick={handleOAuthLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                "Entrar com OAuth"
              )}
            </Button>
          </div>
        )}

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
