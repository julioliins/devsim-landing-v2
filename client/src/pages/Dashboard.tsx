import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProfileSettings from "@/components/settings/ProfileSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import SupportSettings from "@/components/settings/SupportSettings";

export default function Dashboard() {
  const { isAuthenticated, loading } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/auth/login");
    }
  }, [isAuthenticated, loading, setLocation]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const tab = location.split("?tab=")[1] || "profile";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-2">Gerencie sua conta e preferências</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 border-b border-border overflow-x-auto">
          {[
            { id: "profile", label: "Perfil" },
            { id: "security", label: "Segurança" },
            { id: "privacy", label: "Privacidade/LGPD" },
            { id: "support", label: "Suporte" },
          ].map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setLocation(`/dashboard?tab=${tabItem.id}`)}
              className={`px-4 py-3 font-medium border-b-2 transition whitespace-nowrap ${
                tab === tabItem.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tabItem.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {tab === "profile" && <ProfileSettings />}
          {tab === "security" && <SecuritySettings />}
          {tab === "privacy" && <PrivacySettings />}
          {tab === "support" && <SupportSettings />}
        </div>
      </div>
    </DashboardLayout>
  );
}
