import { useCombinedAuth } from "@/hooks/useLocalAuth";
import { useLocation, useSearch } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProfileSettings from "@/components/settings/ProfileSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import SupportSettings from "@/components/settings/SupportSettings";

type TabId = "profile" | "security" | "privacy" | "support";

export default function Dashboard() {
  const { isAuthenticated, loading } = useCombinedAuth();
  const [, setLocation] = useLocation();
  const search = useSearch();

  // Get initial tab from URL search params
  const getInitialTab = (): TabId => {
    const params = new URLSearchParams(search);
    const tabParam = params.get("tab");
    if (tabParam === "security" || tabParam === "privacy" || tabParam === "support" || tabParam === "profile") {
      return tabParam;
    }
    return "profile";
  };

  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab());

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/auth/login");
    }
  }, [isAuthenticated, loading, setLocation]);

  // Update tab when URL changes
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [search]);

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

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setLocation(`/dashboard?tab=${tabId}`);
  };

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: "profile", label: "Perfil" },
    { id: "security", label: "Segurança" },
    { id: "privacy", label: "Privacidade/LGPD" },
    { id: "support", label: "Suporte" },
  ];

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
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => handleTabChange(tabItem.id)}
              className={`px-4 py-3 font-medium border-b-2 transition whitespace-nowrap ${
                activeTab === tabItem.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tabItem.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "privacy" && <PrivacySettings />}
          {activeTab === "support" && <SupportSettings />}
        </div>
      </div>
    </DashboardLayout>
  );
}
