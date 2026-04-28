import { useMemo } from "react";
import { useLocation, useRoute } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle2,
  Target,
  Rocket,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { getWorkspaceContent } from "@/data/workspaceContent";
import { useWorkspaceProgress } from "@/hooks/useWorkspaceProgress";
import SprintTimeline from "@/components/workspace/SprintTimeline";
import LearningPathStep from "@/components/workspace/LearningPathStep";
import { MentorChat } from "@/components/workspace/MentorChat";
import { FaqAccordion } from "@/components/workspace/FaqAccordion";

export default function VirtualWorkspace() {
  const [, params] = useRoute<{ slug: string }>("/workspace/:slug");
  const [, setLocation] = useLocation();
  const slug = (params?.slug ?? "desenvolvedor").toLowerCase();

  const content = useMemo(() => getWorkspaceContent(slug), [slug]);
  const {
    progress,
    completeStep,
    resetStep,
    isStepComplete,
    isStepUnlocked,
  } = useWorkspaceProgress(slug);

  if (!content) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Profissão não encontrada
          </h1>
          <p className="mt-2 text-muted-foreground">
            A Área Virtual para “{slug}” ainda não está disponível.
          </p>
          <Button
            className="mt-6"
            onClick={() => setLocation("/career-selection")}
          >
            Voltar para seleção de carreira
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const ProfessionIcon = content.icon;

  const totalSteps = content.learningPath.length;
  const completedCount = progress.completedSteps.filter((id) =>
    content.learningPath.some((s) => s.id === id),
  ).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const allDone = completedCount === totalSteps;

  const stepTitleById = (id: string) =>
    content.learningPath.find((s) => s.id === id)?.title ?? id;

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Breadcrumb / Back */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 h-8 px-2 text-muted-foreground hover:text-foreground"
            onClick={() => setLocation("/career-selection")}
          >
            <ArrowLeft className="h-4 w-4" />
            Carreiras
          </Button>
          <span>/</span>
          <span className="text-foreground font-medium">{content.name}</span>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-8 md:p-10 text-white shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <ProfessionIcon className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <Badge className="bg-white/15 text-white hover:bg-white/20 border-0 mb-3">
                Profissão Ativa · {content.name}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Área Virtual de Trabalho DevSim
              </h1>
              <p className="mt-2 text-blue-50/90 max-w-3xl leading-relaxed">
                {content.tagline}
              </p>
              <p className="mt-1 text-sm text-blue-100/80 max-w-3xl">
                Transformando requisitos acadêmicos em competências práticas de mercado através de simulações controladas e trilhas guiadas.
              </p>
            </div>
            <div className="md:min-w-[220px] shrink-0">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wider text-blue-100">
                  Progresso da trilha
                </p>
                <p className="mt-1 text-3xl font-bold">{progressPercent}%</p>
                <Progress
                  value={progressPercent}
                  className="mt-2 bg-white/20 [&>div]:bg-white"
                />
                <p className="mt-2 text-xs text-blue-100">
                  {completedCount} de {totalSteps} etapas concluídas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Texto motivacional */}
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Fase 1: O {content.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {content.hero}
              </p>
              <p className="mt-3 text-sm">
                <span className="font-semibold text-primary">Objetivo: </span>
                <span className="text-muted-foreground">{content.objective}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Sprint Timeline */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                O Ritmo de Mercado · Sprint de 2 semanas
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Você está atualmente na{" "}
                <span className="font-semibold text-primary">
                  Demanda {content.currentDemand.number}: {content.currentDemand.title}
                </span>
                .
              </p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Rocket className="h-3 w-3" />
              {content.currentDemand.sprintDayRange}
            </Badge>
          </div>
          <Card className="p-6">
            <SprintTimeline phases={content.sprint} />
          </Card>
        </section>

        {/* Demanda 1 detalhada */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 md:col-span-2">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-foreground">
                    Demanda {content.currentDemand.number}: {content.currentDemand.title}
                  </h3>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0">
                    Ativa
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {content.currentDemand.description}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Critérios de aceite
            </h4>
            <ul className="space-y-2">
              {content.currentDemand.acceptanceCriteria.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Ferramentas essenciais */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Ferramentas Essenciais
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Setup recomendado para iniciar a codificação da Demanda 1.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.tools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <Card
                  key={tool.name}
                  className="p-5 hover:shadow-md transition group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ToolIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-foreground">{tool.name}</h4>
                        {tool.essential && (
                          <Badge variant="outline" className="text-[10px]">
                            Essencial
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground leading-snug">
                        {tool.description}
                      </p>
                      {tool.installUrl && (
                        <a
                          href={tool.installUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          Baixar
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Trilha de Aprendizado */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Trilha DevSim · Passo a Passo
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Conclua cada etapa na ordem para desbloquear o conteúdo avançado.
            </p>
          </div>

          <div className="space-y-4">
            {content.learningPath.map((step) => {
              const unlocked = isStepUnlocked(step.id, step.requiresCompletionOf);
              const complete = isStepComplete(step.id);
              const requiresLabels = step.requiresCompletionOf.map(stepTitleById);
              return (
                <LearningPathStep
                  key={step.id}
                  step={step}
                  isUnlocked={unlocked}
                  isComplete={complete}
                  requiresLabels={requiresLabels}
                  onComplete={() => completeStep(step.id)}
                  onReset={() => resetStep(step.id)}
                />
              );
            })}
          </div>

          {allDone && (
            <Card className="p-6 border-primary/30 bg-primary/5" id="trilha-concluida">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Rocket className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    Trilha concluída! Pronto para a Demanda 1.
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Agora que você entende a profissão e configurou as ferramentas,
                    o ambiente está pronto para começar a codificação real da sprint.
                  </p>
                </div>
                <Button
                  onClick={() =>
                    setLocation(`/methodology-selection?career=1`)
                  }
                  className="shrink-0"
                >
                  Iniciar simulação
                </Button>
              </div>
            </Card>
          )}
        </section>

        {/* Mentor Dev Sim na Review */}
        <section className="space-y-4" id="review-mentor">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Review da Sprint · Converse com o mentor
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Na fase Review, você apresenta o que aprendeu e tira dúvidas.
              Selecione uma pergunta abaixo e receba orientação do{" "}
              <span className="font-medium text-foreground">Dev Sim</span>, seu mentor virtual.
            </p>
          </div>
          <MentorChat
            professionName={content.name}
            questions={content.mentorQuestions}
          />
        </section>

        {/* FAQ de mercado */}
        <section className="space-y-4" id="faq">
          <FaqAccordion professionName={content.name} items={content.faq} />
        </section>
      </div>
    </DashboardLayout>
  );
}
