import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Layers, ArrowRight, Loader2, ChevronLeft } from "lucide-react";

const methodologies = [
  {
    id: "agile",
    name: "Metodologia Ágil",
    description: "Trabalhe com sprints curtos, daily standups e iterações rápidas. Ideal para projetos dinâmicos.",
    icon: Zap,
    color: "from-blue-500 to-blue-600",
    features: ["Sprints de 2 semanas", "Daily Standups", "Retrospectivas", "Feedback Contínuo"],
    difficulty: "Médio",
  },
  {
    id: "waterfall",
    name: "Metodologia Cascata",
    description: "Siga uma sequência linear: planejamento, design, implementação e testes. Estruturado e previsível.",
    icon: Layers,
    color: "from-green-500 to-green-600",
    features: ["Fases Sequenciais", "Documentação Completa", "Testes Finais", "Entrega Única"],
    difficulty: "Fácil",
  },
];

export default function MethodologySelection() {
  const [, setLocation] = useLocation();
  const query = useSearch();
  const careerId = new URLSearchParams(query).get("career");
  const [selectedMethodology, setSelectedMethodology] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectMethodology = (methodologyId: string) => {
    setSelectedMethodology(methodologyId);
    setIsLoading(true);
    // Simulate navigation delay
     setTimeout(() => {
      setLocation(`/simulator/environment?career=${careerId}&methodology=${methodologyId}`);
    }, 500);
  };

  const handleBack = () => {
    setLocation("/simulator/careers");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="hover:bg-muted"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Escolha a Metodologia</h1>
                <p className="text-muted-foreground mt-1">
                  Selecione como você quer trabalhar nesta simulação
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {methodologies.map((methodology) => {
            const IconComponent = methodology.icon;
            const isSelected = selectedMethodology === methodology.id;

            return (
              <Card
                key={methodology.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected
                    ? "ring-2 ring-primary shadow-lg scale-105"
                    : "hover:shadow-md hover:scale-102"
                }`}
                onClick={() => handleSelectMethodology(methodology.id)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${methodology.color} opacity-5`}
                />

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br ${methodology.color} text-white mb-4`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-2">{methodology.name}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">{methodology.description}</p>

                  {/* Difficulty */}
                  <div className="mb-4">
                    <Badge
                      variant={
                        methodology.difficulty === "Fácil"
                          ? "default"
                          : methodology.difficulty === "Médio"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {methodology.difficulty}
                    </Badge>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Características:</h4>
                    <ul className="space-y-2">
                      {methodology.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full group"
                    disabled={isLoading && isSelected}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      handleSelectMethodology(methodology.id);
                    }}
                  >
                    {isLoading && isSelected ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Iniciando...
                      </>
                    ) : (
                      <>
                        Começar Simulação
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse" />
                )}
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0">
            <h3 className="text-xl font-bold text-foreground mb-4">💡 Dica</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ambas as metodologias oferecem experiências valiosas. Se é sua primeira vez, recomendamos começar com
              <strong> Cascata</strong> para entender os conceitos básicos. Depois, experimente <strong>Ágil</strong> para
              vivenciar um ambiente mais dinâmico e colaborativo.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
