import type { SprintPhase } from "@/data/workspaceContent";
import { Check } from "lucide-react";

export type SprintTimelineProps = {
  phases: SprintPhase[];
};

/**
 * SprintTimeline — visualização horizontal do ciclo de sprint de 2 semanas.
 * Destaca a fase ativa e mostra os dias da sprint para contextualizar o aluno.
 */
export default function SprintTimeline({ phases }: SprintTimelineProps) {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Linha conectora */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-border md:block hidden" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {phases.map((phase, idx) => {
            const isActive = phase.active;
            const isPast =
              !isActive &&
              phases.findIndex((p) => p.active) > idx;

            return (
              <div key={phase.id} className="relative flex md:flex-col items-start md:items-center gap-3 md:text-center">
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : isPast
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {isPast ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-semibold">{idx + 1}</span>
                  )}
                </div>

                <div className="min-w-0 md:mt-2">
                  <div className="flex items-center gap-2 md:justify-center">
                    <h4
                      className={`text-sm font-semibold ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {phase.name}
                    </h4>
                    {isActive && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                        Atual
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-snug">
                    {phase.description}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-primary/80">{phase.days}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
