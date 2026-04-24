import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Award, TrendingUp, BookOpen, MessageSquare, ArrowRight, Home } from "lucide-react";

interface SessionData {
  totalTasks: number;
  completedTasks: number;
  totalPoints: number;
  earnedPoints: number;
  sessionTime: number;
  topicsLearned: string[];
}

export default function SessionSummary() {
  const [, setLocation] = useLocation();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in real app, this would come from session context or API
  const sessionData: SessionData = {
    totalTasks: 3,
    completedTasks: 2,
    totalPoints: 225,
    earnedPoints: 175,
    sessionTime: 1245,
    topicsLearned: [
      "Autenticação e Segurança",
      "Otimização de Banco de Dados",
      "Code Review",
      "Comunicação em Equipe",
    ],
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m ${secs}s`;
  };

  const completionPercentage = Math.round(
    (sessionData.completedTasks / sessionData.totalTasks) * 100
  );

  const handleSubmitFeedback = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setLocation("/simulator/careers");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Simulação Concluída! 🎉</h1>
            <p className="text-muted-foreground">Veja como você se saiu</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Score Card */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Award className="w-16 h-16 text-yellow-500" />
              </div>
              <h2 className="text-5xl font-bold text-foreground mb-2">{sessionData.earnedPoints}</h2>
              <p className="text-muted-foreground mb-6">
                de {sessionData.totalPoints} pontos possíveis
              </p>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-1000"
                  style={{ width: `${(sessionData.earnedPoints / sessionData.totalPoints) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tasks Completed */}
            <Card className="p-6 border-l-4 border-l-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Tarefas Completadas</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">
                {sessionData.completedTasks}/{sessionData.totalTasks}
              </p>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{completionPercentage}% de conclusão</p>
            </Card>

            {/* Time Spent */}
            <Card className="p-6 border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Tempo Gasto</h3>
                <span className="text-2xl">⏱️</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {formatTime(sessionData.sessionTime)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Bom ritmo! Você manteve o foco durante toda a sessão.
              </p>
            </Card>

            {/* Performance */}
            <Card className="p-6 border-l-4 border-l-purple-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Performance</h3>
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {Math.round((sessionData.earnedPoints / sessionData.totalPoints) * 100)}%
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Excelente desempenho nesta simulação!
              </p>
            </Card>
          </div>

          {/* Topics Learned */}
          <Card className="p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Tópicos Abordados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessionData.topicsLearned.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-muted rounded-lg border border-border hover:border-primary transition"
                >
                  <p className="text-sm font-semibold text-foreground">{topic}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Feedback */}
          <Card className="p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Deixe seu Feedback
            </h3>
            <div className="space-y-4">
              <Textarea
                placeholder="Como foi sua experiência? O que podemos melhorar?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-32"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setLocation("/simulator/careers")}
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Voltar ao Início
                </Button>
                <Button
                  onClick={handleSubmitFeedback}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Feedback"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-0">
            <h3 className="text-lg font-bold text-foreground mb-4">💡 Recomendações</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Badge className="mt-1">1</Badge>
                <p className="text-sm text-muted-foreground">
                  Explore a metodologia oposta para comparar as abordagens
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-1">2</Badge>
                <p className="text-sm text-muted-foreground">
                  Pratique com carreiras diferentes para ampliar suas habilidades
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-1">3</Badge>
                <p className="text-sm text-muted-foreground">
                  Revise os tópicos abordados na documentação de suporte
                </p>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
