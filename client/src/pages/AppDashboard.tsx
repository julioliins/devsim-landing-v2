import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Zap, Users, Code, Settings, BarChart3, Briefcase } from "lucide-react";

const CAREERS = [
  {
    id: "developer",
    name: "Desenvolvedor de Software",
    description: "Aprenda a desenvolver aplicações modernas",
    icon: Code,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "tester",
    name: "Testador de Software",
    description: "Domine técnicas de teste e qualidade",
    icon: BarChart3,
    color: "from-green-500 to-green-600",
  },
  {
    id: "analyst",
    name: "Analista de Sistemas",
    description: "Analise e projete soluções de TI",
    icon: Briefcase,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "devops",
    name: "DevOps Engineer",
    description: "Gerencie infraestrutura e deployments",
    icon: Settings,
    color: "from-orange-500 to-orange-600",
  },
];

export default function AppDashboard() {
  const { isAuthenticated, loading, user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const userSessions = trpc.simulator.getUserSessions.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/auth/login");
    }
  }, [isAuthenticated, loading, setLocation]);

  if (loading || !isAuthenticated) {
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

  const sessions = userSessions.data || [];
  const completedCount = sessions.filter((s) => s.status === "completed").length;

  const handleSelectCareer = (careerId: string) => {
    setSelectedCareer(careerId);
    setLocation(`/methodology-selection?career=${careerId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Bem-vindo ao DevSim!</h1>
          <p className="text-lg text-muted-foreground">
            Escolha uma carreira e comece sua simulação de aprendizado
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Simulações Completadas</p>
                <p className="text-3xl font-bold text-foreground">{completedCount}</p>
              </div>
              <Zap className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-border bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Simulações</p>
                <p className="text-3xl font-bold text-foreground">{sessions.length}</p>
              </div>
              <Users className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-border bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pontuação Média</p>
                <p className="text-3xl font-bold text-foreground">
                  {sessions.length > 0
                    ? Math.round(sessions.reduce((sum, s) => sum + (s.score || 0), 0) / sessions.length)
                    : 0}
                </p>
              </div>
              <BarChart3 className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>
        </div>

        {/* Careers Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Escolha uma Carreira</h2>
          <p className="text-muted-foreground">Selecione a carreira que deseja simular</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREERS.map((career) => {
              const Icon = career.icon;
              return (
                <Card
                  key={career.id}
                  className="p-6 border border-border hover:border-primary/50 transition cursor-pointer group"
                  onClick={() => handleSelectCareer(career.id)}
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${career.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition">
                        {career.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{career.description}</p>
                    </div>

                    {/* Button */}
                    <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                      Começar Simulação
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-12"
              onClick={() => setLocation("/my-simulations")}
            >
              Ver Meu Histórico
            </Button>
            <Button
              variant="outline"
              className="h-12"
              onClick={() => setLocation("/dashboard?tab=profile")}
            >
              Configurações
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
