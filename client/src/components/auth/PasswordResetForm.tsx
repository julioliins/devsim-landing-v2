import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function PasswordResetForm() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const token = new URLSearchParams(search).get("token");

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<"request" | "reset">(token ? "reset" : "request");

  const requestResetMutation = trpc.auth.requestPasswordReset.useMutation({
    onSuccess: () => {
      setSuccess(true);
      toast.success("Email de recuperação enviado!");
    },
    onError: (error) => {
      setError(error.message || "Falha ao enviar email");
      toast.error(error.message || "Falha ao enviar email");
    },
  });

  const resetPasswordMutation = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      setSuccess(true);
      toast.success("Senha redefinida com sucesso!");
      setTimeout(() => {
        setLocation("/auth/login");
      }, 2000);
    },
    onError: (error) => {
      setError(error.message || "Falha ao redefinir senha");
      toast.error(error.message || "Falha ao redefinir senha");
    },
  });

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email) {
        setError("Por favor, digite seu e-mail");
        setIsLoading(false);
        return;
      }

      await requestResetMutation.mutateAsync({ email });
    } catch (err: any) {
      setError(err.message || "Falha ao enviar email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!token) {
        setError("Token inválido");
        setIsLoading(false);
        return;
      }

      if (!newPassword || !confirmPassword) {
        setError("Por favor, preencha todos os campos");
        setIsLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("As senhas não coincidem");
        setIsLoading(false);
        return;
      }

      const hasUpperCase = /[A-Z]/.test(newPassword);
      const hasLowerCase = /[a-z]/.test(newPassword);
      const hasNumber = /[0-9]/.test(newPassword);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        setError(
          "Senha deve conter maiúsculas, minúsculas, números e caracteres especiais"
        );
        setIsLoading(false);
        return;
      }

      await resetPasswordMutation.mutateAsync({
        token,
        newPassword,
        confirmPassword,
      });
    } catch (err: any) {
      setError(err.message || "Falha ao redefinir senha");
    } finally {
      setIsLoading(false);
    }
  };

  if (success && step === "request") {
    return (
      <Card className="p-8 border border-border">
        <div className="space-y-6 text-center">
          <Mail className="w-16 h-16 text-primary mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Verifique seu E-mail</h2>
            <p className="text-muted-foreground">
              Enviamos um link de recuperação para <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Clique no link para redefinir sua senha. O link expira em 24 horas.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setLocation("/auth/login")}
          >
            Voltar para Login
          </Button>
        </div>
      </Card>
    );
  }

  if (success && step === "reset") {
    return (
      <Card className="p-8 border border-border">
        <div className="space-y-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Senha Redefinida!</h2>
            <p className="text-muted-foreground">
              Sua senha foi redefinida com sucesso. Redirecionando para login...
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (step === "request") {
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
            <h1 className="text-2xl font-bold text-foreground">Recuperar Senha</h1>
            <p className="text-sm text-muted-foreground">
              Digite seu e-mail para receber um link de recuperação
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRequestReset} className="space-y-4">
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Link de Recuperação"
              )}
            </Button>
          </form>

          {/* Links */}
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setLocation("/auth/login")}
              className="text-primary hover:underline font-medium"
            >
              Voltar para Login
            </button>
          </div>
        </div>
      </Card>
    );
  }

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
          <h1 className="text-2xl font-bold text-foreground">Redefinir Senha</h1>
          <p className="text-sm text-muted-foreground">Digite sua nova senha</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova Senha</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Redefinindo...
              </>
            ) : (
              "Redefinir Senha"
            )}
          </Button>
        </form>

        {/* Links */}
        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => setLocation("/auth/login")}
            className="text-primary hover:underline font-medium"
          >
            Voltar para Login
          </button>
        </div>
      </div>
    </Card>
  );
}
