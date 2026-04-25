import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, TestTube2, FileText, Zap, ArrowRight, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const careers = [
  {
    id: 1,
    name: "Desenvolvedor",
    description: "Desenvolva aplicações, implemente features e resolva bugs em um ambiente ágil.",
    icon: Code2,
    color: "from-blue-500 to-blue-600",
    skills: ["Programação", "Problem Solving", "Git"],
  },
  {
    id: 2,
    name: "Testador",
    description: "Garanta a qualidade do software através de testes automatizados e manuais.",
    icon: TestTube2,
    color: "from-green-500 to-green-600",
    skills: ["QA", "Testes Automatizados", "Documentação"],
  },
  {
    id: 3,
    name: "Analista",
    description: "Analise requisitos, documente especificações e comunique com stakeholders.",
    icon: FileText,
    color: "from-purple-500 to-purple-600",
    skills: ["Análise", "Comunicação", "Documentação"],
  },
  {
    id: 4,
    name: "DevOps",
    description: "Gerencie infraestrutura, deploy e monitoramento de aplicações.",
    icon: Zap,
    color: "from-orange-500 to-orange-600",
    skills: ["CI/CD", "Docker", "Monitoramento"],
  },
];

export default function CareerSelection() {
  const [, setLocation] = useLocation();
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectCareer = (careerId: number) => {
    setSelectedCareer(careerId);
    setIsLoading(true);
    // Simulate navigation delay
    setTimeout(() => {
      setLocation(`/simulator/methodology?career=${careerId}`);
    }, 500);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Escolha sua Carreira</h1>
        <p className="text-muted-foreground mt-1">Selecione a profissão que deseja simular</p>
      </div>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {careers.map((career) => {
            const IconComponent = career.icon;
            const isSelected = selectedCareer === career.id;

            return (
              <Card
                key={career.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected
                    ? "ring-2 ring-primary shadow-lg scale-105"
                    : "hover:shadow-md hover:scale-102"
                }`}
                onClick={() => handleSelectCareer(career.id)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${career.color} opacity-5`}
                />

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br ${career.color} text-white mb-4`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-2">{career.name}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">{career.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {career.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Button */}
                  <Button
                    className="w-full group"
                    disabled={isLoading && isSelected}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      handleSelectCareer(career.id);
                    }}
                  >
                    {isLoading && isSelected ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Carregando...
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-l-4 border-l-blue-500">
            <h4 className="font-semibold text-foreground mb-2">Aprenda Praticando</h4>
            <p className="text-sm text-muted-foreground">
              Simule cenários reais de trabalho e desenvolva suas habilidades profissionais.
            </p>
          </Card>
          <Card className="p-6 border-l-4 border-l-green-500">
            <h4 className="font-semibold text-foreground mb-2">Receba Feedback</h4>
            <p className="text-sm text-muted-foreground">
              Obtenha orientações de mentores virtuais e melhore sua performance.
            </p>
          </Card>
          <Card className="p-6 border-l-4 border-l-purple-500">
            <h4 className="font-semibold text-foreground mb-2">Ganhe Pontos</h4>
            <p className="text-sm text-muted-foreground">
              Complete tarefas e acumule pontos para desbloquear novas funcionalidades.
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
