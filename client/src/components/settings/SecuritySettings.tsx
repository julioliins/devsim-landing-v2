import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, Shield } from "lucide-react";
import { useSecurity } from "@/hooks/useSecurity";
import { toast } from "sonner";

export default function SecuritySettings() {
  const { changePassword, isChangingPassword, passwordError } = useSecurity();
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

  return (
    <div className="space-y-6">
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
    </div>
  );
}
