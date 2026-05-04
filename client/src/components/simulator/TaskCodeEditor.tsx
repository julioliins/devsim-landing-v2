import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import {
  runChecks,
  type TaskDefinition,
  type VerificationResult,
} from "@/data/simulatorTasks";

interface TaskCodeEditorProps {
  task: TaskDefinition;
  onComplete: (task: TaskDefinition) => void;
  onClose?: () => void;
}

/**
 * Editor de código simplificado com verificação automática.
 * Usa um <textarea> com fonte monoespaçada (deliberadamente leve — evita
 * dependências pesadas tipo Monaco) e executa checks regex/keyword sobre
 * o conteúdo digitado.
 */
export default function TaskCodeEditor({
  task,
  onComplete,
  onClose,
}: TaskCodeEditorProps) {
  const [code, setCode] = useState(task.starterCode);
  const [result, setResult] = useState<VerificationResult | null>(null);

  // Ao trocar de tarefa, recarrega o starter code
  useEffect(() => {
    setCode(task.starterCode);
    setResult(null);
  }, [task.id, task.starterCode]);

  const difficultyColor = useMemo(() => {
    switch (task.difficulty) {
      case "easy":
        return "bg-emerald-500";
      case "medium":
        return "bg-amber-500";
      case "hard":
        return "bg-red-500";
    }
  }, [task.difficulty]);

  const handleVerify = () => {
    const r = runChecks(code, task.checks);
    setResult(r);
  };

  const handleSubmit = () => {
    const r = result ?? runChecks(code, task.checks);
    setResult(r);
    if (r.allPassed) {
      onComplete(task);
    }
  };

  const handleReset = () => {
    setCode(task.starterCode);
    setResult(null);
  };

  const percent = result ? Math.round((result.passed / result.total) * 100) : 0;

  return (
    <Card className="overflow-hidden border-primary/30">
      {/* Cabeçalho da tarefa */}
      <div className="border-b border-border bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Code2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-foreground truncate">
                  {task.title}
                </h3>
                <Badge
                  className={`${difficultyColor} text-white border-0 text-[10px] uppercase`}
                >
                  {task.difficulty}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {task.language}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground leading-snug">
                {task.description}
              </p>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={onClose}
              aria-label="Fechar tarefa"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {task.briefing && (
          <div className="mt-4 flex gap-2 items-start rounded-lg bg-background/70 border border-border p-3">
            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/80 leading-relaxed">
              {task.briefing}
            </p>
          </div>
        )}
      </div>

      {/* Editor */}
      <div className="p-5 space-y-4">
        <div>
          <label
            htmlFor={`task-code-${task.id}`}
            className="flex items-center justify-between mb-2"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Seu código ({task.language})
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={handleReset}
            >
              <RotateCcw className="h-3 w-3" />
              Restaurar
            </Button>
          </label>
          <textarea
            id={`task-code-${task.id}`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full min-h-[260px] rounded-lg border border-border bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed p-4 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
            placeholder="Escreva seu código aqui..."
          />
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleVerify}
            variant="outline"
            className="gap-2 flex-1"
          >
            <Play className="h-4 w-4" />
            Verificar solução
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!result || !result.allPassed}
            className="gap-2 flex-1"
          >
            <Check className="h-4 w-4" />
            Submeter e concluir (+{task.points} pts)
          </Button>
        </div>

        {/* Resultado dos checks */}
        {result && (
          <div
            className={`rounded-lg border p-4 space-y-3 ${
              result.allPassed
                ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900/50"
                : "border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900/50"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {result.allPassed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                )}
                <p className="text-sm font-semibold text-foreground">
                  {result.allPassed
                    ? "Todos os requisitos foram atendidos!"
                    : `${result.passed} de ${result.total} requisitos atendidos`}
                </p>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {percent}%
              </span>
            </div>

            <Progress value={percent} className="h-1.5" />

            <ul className="space-y-2 pt-1">
              {result.results.map((r) => (
                <li
                  key={r.id}
                  className="flex items-start gap-2 text-sm"
                >
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                      r.passed
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {r.passed ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`${
                        r.passed
                          ? "text-foreground"
                          : "text-foreground font-medium"
                      }`}
                    >
                      {r.label}
                    </p>
                    {!r.passed && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {r.hint}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {result.allPassed && (
              <p className="text-xs text-emerald-700 dark:text-emerald-400 pt-1">
                Clique em <span className="font-semibold">Submeter e concluir</span> para ganhar{" "}
                <span className="font-semibold">+{task.points} pontos</span>.
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
