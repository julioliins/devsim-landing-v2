import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Calendar, Zap, TrendingUp, RotateCcw } from "lucide-react";
import { useLocation } from "wouter";

export default function MySimulations() {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

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
            <p className="text-muted-foreground">Carregando simulações...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const sessions = userSessions.data || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Simulações</h1>
          <p className="text-muted-foreground mt-2">Histórico de suas simulações de carreira</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Simulações</p>
                <p className="text-3xl font-bold text-foreground">{sessions.length}</p>
              </div>
              <Zap className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pontuação Média</p>
                <p className="text-3xl font-bold text-foreground">
                  {sessions.length > 0
                    ? Math.round(
                        sessions.reduce((sum, s) => sum + (s.score || 0), 0) / sessions.length
                      )
                    : 0}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Última Simulação</p>
                <p className="text-lg font-bold text-foreground">
                  {sessions.length > 0
                    ? new Date(sessions[0].createdAt).toLocaleDateString("pt-BR")
                    : "Nenhuma"}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>
        </div>

        {/* Simulations List */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Histórico</h2>

          {sessions.length === 0 ? (
            <Card className="p-12 border border-border text-center">
              <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">Você ainda não realizou nenhuma simulação</p>
              <Button
                onClick={() => setLocation("/career-selection")}
                className="bg-primary hover:bg-primary/90"
              >
                Começar uma Simulação
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <Card key={session.id} className="p-6 border border-border hover:border-primary/50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground capitalize">
                        Simulação #{session.id}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Metodologia: <span className="font-medium">{session.methodology === "agile" ? "Ágil" : "Cascata"}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Data: {new Date(session.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{session.score || 0}</div>
                      <p className="text-xs text-muted-foreground">pontos</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => setLocation(`/session-summary?id=${session.id}`)}
                      >
                        Ver Resumo
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {session.status === "completed" && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ✓ Concluída
                      </span>
                    )}
                    {session.status === "active" && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        ⏳ Ativa
                      </span>
                    )}
                    {session.status === "paused" && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        ⏸ Pausada
                      </span>
                    )}
                    {session.status === "abandoned" && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        ⊘ Abandonada
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {sessions.length > 0 && (
          <div className="flex gap-4">
            <Button
              onClick={() => setLocation("/career-selection")}
              className="bg-primary hover:bg-primary/90"
            >
              <Zap className="w-4 h-4 mr-2" />
              Nova Simulação
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
