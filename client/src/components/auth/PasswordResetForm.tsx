import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";

export default function PasswordResetForm() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Placeholder for password reset - in production, implement email sending
      setSuccess(true);
    } catch (err) {
      setError("Falha ao enviar e-mail de recuperação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
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
          <p>
            <button
              type="button"
              onClick={() => setLocation("/auth/login")}
              className="text-primary hover:underline font-medium"
            >
              Voltar para Login
            </button>
          </p>
        </div>
      </div>
    </Card>
  );
}
