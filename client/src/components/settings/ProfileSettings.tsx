import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

export default function ProfileSettings() {
  const { user } = useAuth();
  const { profile, updateProfile, updateNotifications, isUpdating } = useProfile();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    notificationChannel: (profile?.notificationChannel as "app" | "email" | "whatsapp") || "email",
    notificationFrequency: (profile?.notificationFrequency as "instant" | "daily" | "weekly") || "daily",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        name: formData.name,
        bio: formData.bio,
        phone: formData.phone,
      });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    }
  };

  const handleNotificationUpdate = async () => {
    try {
      await updateNotifications({
        notificationChannel: formData.notificationChannel as "app" | "email" | "whatsapp",
        notificationFrequency: formData.notificationFrequency as "instant" | "daily" | "weekly",
      });
      toast.success("Preferências de notificação atualizadas!");
    } catch (error) {
      toast.error("Erro ao atualizar preferências");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // In production, upload to storage and get URL
        const reader = new FileReader();
        reader.onload = async (event) => {
          const dataUrl = event.target?.result as string;
          await updateProfile({
            profilePhotoUrl: dataUrl,
          });
          toast.success("Foto de perfil atualizada!");
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error("Erro ao fazer upload da foto");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <Card className="p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Foto de Perfil</h3>
        <div className="flex items-center gap-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile?.profilePhotoUrl || ""} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              Escolha uma imagem para sua foto de perfil
            </p>
            <label className="inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUpdating}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  const input = (e.currentTarget.parentElement as HTMLLabelElement)?.querySelector(
                    'input[type="file"]'
                  ) as HTMLInputElement;
                  input?.click();
                }}
                disabled={isUpdating}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUpdating ? "Enviando..." : "Fazer Upload"}
              </Button>
            </label>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Informações Pessoais</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isUpdating}
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground mt-1">E-mail não pode ser alterado</p>
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(11) 99999-9999"
              disabled={isUpdating}
            />
          </div>
          <div>
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Conte um pouco sobre você..."
              className="resize-none"
              rows={4}
              disabled={isUpdating}
            />
          </div>
          <Button type="submit" disabled={isUpdating} className="w-full">
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Preferências de Notificação</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="channel">Canal de Notificação</Label>
            <Select
              value={formData.notificationChannel}
              onValueChange={(value) => handleSelectChange("notificationChannel", value)}
            >
              <SelectTrigger id="channel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">App</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="frequency">Frequência de Notificação</Label>
            <Select
              value={formData.notificationFrequency}
              onValueChange={(value) => handleSelectChange("notificationFrequency", value)}
            >
              <SelectTrigger id="frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instantânea</SelectItem>
                <SelectItem value="daily">Diária</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleNotificationUpdate}
            disabled={isUpdating}
            className="w-full"
            variant="outline"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Atualizar Preferências
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Account Status */}
      <Card className="p-6 border border-border bg-blue-50 dark:bg-blue-950">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Conta Ativa</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Sua conta foi criada em {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-BR") : "data desconhecida"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
