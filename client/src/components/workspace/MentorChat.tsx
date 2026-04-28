import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Sparkles, ArrowRight, Lightbulb } from "lucide-react";
import { MASCOT_IMAGE_URL, MASCOT_NAME, MASCOT_ROLE } from "@/lib/mascot";
import type { MentorQuestion } from "@/data/workspaceContent";

interface MentorChatProps {
  professionName: string;
  questions: MentorQuestion[];
}

/**
 * MentorChat — simula uma conversa com o mascote Dev Sim, que apresenta
 * perguntas comuns de estudantes e responde com:
 *   - resposta curta (contexto)
 *   - direcionamento (o que estudar a seguir)
 *   - exemplo prático dentro do time virtual DevSim
 */
export function MentorChat({ professionName, questions }: MentorChatProps) {
  const [activeId, setActiveId] = useState<string | null>(questions[0]?.id ?? null);
  const active = questions.find((q) => q.id === activeId) ?? null;

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
      <CardContent className="p-6 md:p-8">
        {/* Cabeçalho do mentor */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative shrink-0">
            <img
              src={MASCOT_IMAGE_URL}
              alt={`${MASCOT_NAME}, mentor DevSim`}
              className="h-20 w-20 rounded-2xl object-contain bg-white shadow-md ring-2 ring-primary/20"
            />
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-background">
              <span className="sr-only">online</span>
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-semibold">{MASCOT_NAME}</h3>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                {MASCOT_ROLE}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Oi! Sou o mentor do seu time virtual. Selecione uma d&uacute;vida
              comum de quem est&aacute; come&ccedil;ando como{" "}
              <span className="font-medium text-foreground">
                {professionName}
              </span>{" "}
              e eu te oriento.
            </p>
          </div>
        </div>

        {/* Lista de perguntas (chips) */}
        <div className="flex flex-wrap gap-2 mb-6">
          {questions.map((q) => (
            <Button
              key={q.id}
              size="sm"
              variant={q.id === activeId ? "default" : "outline"}
              className="h-auto whitespace-normal text-left py-2 px-3 text-xs md:text-sm"
              onClick={() => setActiveId(q.id)}
            >
              <MessageCircle className="h-3.5 w-3.5 mr-2 shrink-0" />
              {q.question}
            </Button>
          ))}
        </div>

        {/* Resposta ativa */}
        {active && (
          <div className="space-y-4">
            {/* Pergunta do aluno */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-muted px-4 py-3">
                <p className="text-sm">{active.question}</p>
              </div>
            </div>

            {/* Resposta do mentor */}
            <div className="flex gap-3">
              <img
                src={MASCOT_IMAGE_URL}
                alt=""
                className="h-10 w-10 rounded-full object-contain bg-white shadow-sm shrink-0"
              />
              <div className="flex-1 max-w-[85%] space-y-3">
                <div className="rounded-2xl rounded-tl-sm bg-primary/10 border border-primary/20 px-4 py-3">
                  <p className="text-sm leading-relaxed">{active.shortAnswer}</p>
                </div>

                <div className="rounded-xl border bg-card px-4 py-3">
                  <div className="flex items-start gap-2 mb-1">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      Pr&oacute;ximo passo
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {active.guidance}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30 px-4 py-3">
                  <div className="flex items-start gap-2 mb-1">
                    <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                      Exemplo no time virtual DevSim
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {active.example}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
