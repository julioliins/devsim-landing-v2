import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2, Shield, LogOut } from "lucide-react";
import { useSecurity } from "@/hooks/useSecurity";
import { toast } from "sonner";

export default function SecuritySettings() {
  const { sessions, changePassword, terminateSession, isChangingPassword, passwordError } = useSecurity();
  const [activeTab, setActiveTab] = useState<"password" | "sessions">("password");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(false);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("Senha deve ter no mínimo 8 caracteres");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });
      setPasswordSuccess(true);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Senha alterada com sucesso!");
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      toast.error(passwordError || "Erro ao alterar senha");
    }
  };

  const handleTerminateSession = async (sessionId: number) => {
    try {
      await terminateSession(sessionId);
      toast.success("Sessão encerrada");
    } catch (error) {
      toast.error("Erro ao encerrar sessão");
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("password")}
          className={`px-4 py-2 font-medium text-sm transition ${
            activeTab === "password"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Alterar Senha
        </button>
        <button
          onClick={() => setActiveTab("sessions")}
          className={`px-4 py-2 font-medium text-sm transition ${
            activeTab === "sessions"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sessões Ativas
        </button>
      </div>

      {/* Password Change Tab */}
      {activeTab === "password" && (
        <Card className="p-6 border border-border">
          <div className="space-y-6">
            {/* Password Policy */}
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Política de Senha
              </h4>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>✓ Mínimo 8 caracteres</li>
                <li>✓ Pelo menos uma letra maiúscula</li>
                <li>✓ Pelo menos uma letra minúscula</li>
                <li>✓ Pelo menos um número</li>
                <li>✓ Pelo menos um caractere especial (!@#$%^&*)</li>
              </ul>
            </div>

            {/* Change Password Form */}
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Label htmlFor="current">Senha Atual</Label>
                <Input
                  id="current"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                  disabled={isChangingPassword}
                  required
                />
              </div>
              <div>
                <Label htmlFor="new">Nova Senha</Label>
                <Input
                  id="new"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  disabled={isChangingPassword}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirm">Confirmar Nova Senha</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                  disabled={isChangingPassword}
                  required
                />
              </div>

              {passwordSuccess && (
                <div className="flex gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Senha alterada com sucesso!
                  </p>
                </div>
              )}

              <Button type="submit" disabled={isChangingPassword} className="w-full">
                {isChangingPassword ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  "Alterar Senha"
                )}
              </Button>
            </form>
          </div>
        </Card>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="space-y-4">
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sessões Ativas</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Gerencie suas sessões ativas em diferentes dispositivos
            </p>

            {sessions && sessions.length > 0 ? (
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{session.device}</p>
                        {session.current && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs rounded-full font-medium">
                            Atual
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Última atividade: {new Date(session.lastActive).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    {!session.current && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Encerrar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma sessão ativa</p>
            )}
          </Card>

          {/* Security Info */}
          <Card className="p-6 border border-border bg-amber-50 dark:bg-amber-950">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Dica de Segurança
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Revise regularmente suas sessões ativas. Se encontrar uma sessão desconhecida,
                  encerre-a imediatamente e altere sua senha.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
