import { useState } from "react";
import type { LearningStep } from "@/data/workspaceContent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, ChevronUp, Lock, PlayCircle, RotateCcw } from "lucide-react";
import YoutubePlayer from "./YoutubePlayer";

export type LearningPathStepProps = {
  step: LearningStep;
  isUnlocked: boolean;
  isComplete: boolean;
  requiresLabels: string[];
  onComplete: () => void;
  onReset: () => void;
};

export default function LearningPathStep({
  step,
  isUnlocked,
  isComplete,
  requiresLabels,
  onComplete,
  onReset,
}: LearningPathStepProps) {
  const [expanded, setExpanded] = useState(isUnlocked && !isComplete);

  const statusLabel = isComplete
    ? "Concluído"
    : isUnlocked
      ? "Em progresso"
      : "Bloqueado";

  const statusVariant: "default" | "secondary" | "outline" = isComplete
    ? "default"
    : isUnlocked
      ? "secondary"
      : "outline";

  return (
    <Card
      className={`relative overflow-hidden transition ${
        isComplete ? "border-primary/40 bg-primary/5" : ""
      }`}
    >
      {!isUnlocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-[2px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Lock className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            Etapa bloqueada
          </p>
          {requiresLabels.length > 0 && (
            <p className="text-xs text-muted-foreground text-center max-w-xs px-4">
              Conclua antes: <span className="font-medium">{requiresLabels.join(", ")}</span>
            </p>
          )}
        </div>
      )}
      {/* Cabeçalho sempre visível */}
      <button
        type="button"
        onClick={() => isUnlocked && setExpanded((v) => !v)}
        disabled={!isUnlocked}
        className="flex w-full items-start gap-4 p-6 text-left disabled:cursor-not-allowed"
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
            isComplete
              ? "border-primary bg-primary text-primary-foreground"
              : isUnlocked
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-muted-foreground/30 bg-muted text-muted-foreground"
          }`}
        >
          {isComplete ? (
            <Check className="h-5 w-5" />
          ) : !isUnlocked ? (
            <Lock className="h-4 w-4" />
          ) : (
            <span className="text-sm font-semibold">{step.order}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
            <Badge variant={statusVariant} className="text-[10px] uppercase tracking-wider">
              {statusLabel}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{step.shortDescription}</p>
          {!isUnlocked && requiresLabels.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Conclua antes: <span className="font-medium">{requiresLabels.join(", ")}</span>
            </p>
          )}
        </div>

        <div className="shrink-0 pt-1 text-muted-foreground">
          {isUnlocked &&
            (expanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            ))}
        </div>
      </button>

      {/* Conteúdo expandido */}
      {isUnlocked && expanded && (
        <div className="border-t border-border p-6 space-y-6 bg-background/60">
          <p className="text-sm text-muted-foreground leading-relaxed">{step.body.intro}</p>

          {step.body.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">{section.heading}</h4>
              {section.paragraphs.map((p, pi) => (
                <p key={pi} className="text-sm text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {section.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {step.body.videos.length > 0 && (
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <PlayCircle className="h-4 w-4 text-primary" />
                Assista sem sair do portal
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step.body.videos.map((video) => (
                  <YoutubePlayer
                    key={video.youtubeId}
                    title={video.title}
                    youtubeId={video.youtubeId}
                    duration={video.duration}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 md:p-5">
            {isComplete ? (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Etapa concluída!
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Você já pode avançar para a próxima etapa da trilha.
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Refazer etapa
                </Button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    Assistiu ao conteúdo?
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Marque como concluído para liberar a próxima etapa da trilha.
                  </p>
                </div>
                <Button onClick={onComplete} size="lg" className="gap-2 w-full md:w-auto">
                  <Check className="h-4 w-4" />
                  Concluir e avançar
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
