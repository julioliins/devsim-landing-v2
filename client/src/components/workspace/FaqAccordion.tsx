import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Lightbulb } from "lucide-react";
import { MASCOT_IMAGE_URL, MASCOT_NAME } from "@/lib/mascot";
import type { FaqItem } from "@/data/workspaceContent";

interface FaqAccordionProps {
  professionName: string;
  items: FaqItem[];
}

/**
 * FaqAccordion — seção de dúvidas frequentes de estudantes e mercado.
 * Usa o acordeão do shadcn e apresenta, quando disponível, uma dica
 * adicional do mentor Dev Sim.
 */
export function FaqAccordion({ professionName, items }: FaqAccordionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Perguntas frequentes</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              D&uacute;vidas reais de estudantes e profissionais iniciantes em{" "}
              <span className="font-medium text-foreground">{professionName}</span>.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium text-sm md:text-base pr-4">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {item.answer}
                </p>
                {item.tip && (
                  <div className="flex gap-3 items-start rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 px-3 py-2.5">
                    <img
                      src={MASCOT_IMAGE_URL}
                      alt={MASCOT_NAME}
                      className="h-8 w-8 rounded-full object-contain bg-white shadow-sm shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                          Dica do {MASCOT_NAME}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {item.tip}
                      </p>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
