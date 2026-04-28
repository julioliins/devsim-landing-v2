/**
 * Workspace Content — Dados estáticos da Área Virtual de Trabalho
 *
 * Estrutura baseada na "Arquitetura da Área Virtual DevSim"
 * - Trilha de aprendizado sequencial (3 etapas)
 * - Circuito de Sprint de 2 semanas
 * - Demanda 1 ativa
 */

import {
  Code2,
  TestTube2,
  FileText,
  Zap,
  Terminal,
  Package,
  GitBranch,
  Container,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export type SprintPhase = {
  id: string;
  name: string;
  description: string;
  days: string;
  active?: boolean;
};

export type WorkspaceTool = {
  name: string;
  icon: LucideIcon;
  description: string;
  essential: boolean;
  installUrl?: string;
};

export type LearningStep = {
  id: string;
  order: number;
  title: string;
  shortDescription: string;
  requiresCompletionOf: string[]; // IDs of previous steps required to unlock
  body: {
    intro: string;
    sections: Array<{
      heading: string;
      paragraphs: string[];
      bullets?: string[];
    }>;
    videos: Array<{
      title: string;
      youtubeId: string;
      duration: string;
    }>;
  };
  cta: string;
};

export type WorkspaceProfession = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  hero: string;
  objective: string;
  currentDemand: {
    number: number;
    title: string;
    description: string;
    sprintDayRange: string;
    acceptanceCriteria: string[];
  };
  sprint: SprintPhase[];
  tools: WorkspaceTool[];
  learningPath: LearningStep[];
};

const developerContent: WorkspaceProfession = {
  slug: "desenvolvedor",
  name: "Desenvolvedor",
  icon: Code2,
  tagline: "Imersão em Sprints e Desenvolvimento de Carreira",
  hero:
    "A profissão de desenvolvedor não é apenas sobre “digitar código”, mas sobre solucionar problemas complexos através da lógica. No DevSim, você atuará como um facilitador técnico, traduzindo necessidades de negócio em algoritmos escaláveis.",
  objective:
    "Concluir esta trilha para liberar o ambiente completo de codificação da Demanda 1.",
  currentDemand: {
    number: 1,
    title: "Configuração de Ambiente",
    description:
      "Preparar sua estação de trabalho virtual instalando as ferramentas essenciais para iniciar o desenvolvimento do próximo incremento do produto DevSim.",
    sprintDayRange: "Dia 1 ao 5",
    acceptanceCriteria: [
      "Node.js LTS instalado e rodando (`node -v`)",
      "Editor VS Code configurado com extensões básicas (Prettier, ESLint)",
      "Git configurado com usuário e e-mail globais",
      "Repositório clonado e primeiro commit realizado",
    ],
  },
  sprint: [
    {
      id: "planning",
      name: "Planning",
      description: "Definição da Demanda 1 e critérios de aceite.",
      days: "Dia 0",
    },
    {
      id: "execucao",
      name: "Execução",
      description: "Desenvolvimento focado da demanda atual.",
      days: "Dia 1 ao 5",
      active: true,
    },
    {
      id: "review",
      name: "Review",
      description: "Apresentação dos resultados ao NPC (Stakeholder).",
      days: "Dia 8",
    },
    {
      id: "retro",
      name: "Retrospectiva",
      description: "Ajuste de processos e aprendizado contínuo.",
      days: "Dia 10",
    },
  ],
  tools: [
    {
      name: "Node.js (LTS)",
      icon: Cpu,
      description: "Engine para rodar JavaScript no servidor e build.",
      essential: true,
      installUrl: "https://nodejs.org/",
    },
    {
      name: "Terminal / Zsh",
      icon: Terminal,
      description: "Onde a mágica dos comandos acontece.",
      essential: true,
    },
    {
      name: "Postman",
      icon: Package,
      description: "Teste de APIs criadas na sprint.",
      essential: true,
      installUrl: "https://www.postman.com/downloads/",
    },
    {
      name: "VS Code",
      icon: Code2,
      description:
        "Editor de código padrão da indústria. Você aprenderá extensões essenciais para agilidade.",
      essential: true,
      installUrl: "https://code.visualstudio.com/",
    },
    {
      name: "Git & GitHub",
      icon: GitBranch,
      description:
        "Controle de versão. Essencial para o Pull Request mencionado no RD2 do sistema.",
      essential: true,
      installUrl: "https://git-scm.com/",
    },
    {
      name: "Docker",
      icon: Container,
      description:
        "Garante que o software funcione em qualquer máquina sem erros de dependência.",
      essential: false,
      installUrl: "https://www.docker.com/products/docker-desktop/",
    },
  ],
  learningPath: [
    {
      id: "step-1-profissao",
      order: 1,
      title: "O que é a profissão",
      shortDescription:
        "Entenda o papel do desenvolvedor no mercado e dentro do DevSim.",
      requiresCompletionOf: [],
      body: {
        intro:
          "Antes de instalar qualquer ferramenta, precisamos alinhar expectativas sobre o que significa ser Desenvolvedor hoje. O foco não é apenas escrever código, mas entregar valor de forma contínua dentro de um time multidisciplinar.",
        sections: [
          {
            heading: "O que um desenvolvedor realmente faz?",
            paragraphs: [
              "O desenvolvedor é responsável por traduzir necessidades de negócio em soluções técnicas executáveis. Ele escreve código, mas também participa de reuniões de planejamento, revisão entre pares (code review), debates sobre arquitetura e discussões de prioridade com o time de produto.",
              "No DevSim, você assumirá esse papel dentro de uma empresa fictícia, participando de sprints reais de duas semanas, conversando com NPCs que representam Product Owners, Tech Leads e Stakeholders.",
            ],
            bullets: [
              "Transformar requisitos em código de produção",
              "Participar de cerimônias ágeis (Planning, Daily, Review, Retro)",
              "Colaborar em revisões de código (Pull Requests)",
              "Garantir qualidade através de testes automatizados",
            ],
          },
          {
            heading: "Habilidades que você vai exercitar",
            paragraphs: [
              "Esta trilha combina hard skills (técnicas) com soft skills (comportamentais). Ambas são avaliadas pelos NPCs ao longo do simulador.",
            ],
            bullets: [
              "Lógica de programação e estruturas de dados",
              "Versionamento com Git e fluxo colaborativo no GitHub",
              "Comunicação clara em descrições de Pull Request",
              "Gerenciamento de tempo dentro de uma sprint",
            ],
          },
        ],
        videos: [
          {
            title: "O que faz um desenvolvedor de software?",
            youtubeId: "A8jsipFR2_A",
            duration: "12 min",
          },
        ],
      },
      cta: "Concluí e entendi o papel",
    },
    {
      id: "step-2-ferramentas",
      order: 2,
      title: "Quais aplicativos e ferramentas",
      shortDescription:
        "Configure o ambiente local com as ferramentas essenciais da sprint.",
      requiresCompletionOf: ["step-1-profissao"],
      body: {
        intro:
          "Todo desenvolvedor precisa de um ambiente de trabalho configurado. Vamos instalar, passo a passo, as ferramentas que você usará a partir do dia 1 de sprint. Não se preocupe em decorar comandos — a trilha mostra o que copiar e colar.",
        sections: [
          {
            heading: "Setup Essencial (Fase 1)",
            paragraphs: [
              "Estas três ferramentas formam a base mínima para executar qualquer tarefa da Demanda 1.",
            ],
            bullets: [
              "Node.js (LTS) — baixe em nodejs.org e verifique com `node -v`",
              "Terminal/Zsh — no macOS já vem nativo; no Windows use WSL2",
              "Postman — aplicativo gráfico para testar APIs",
            ],
          },
          {
            heading: "Fase 2: Ferramentas Essenciais do Dia a Dia",
            paragraphs: [
              "Após o setup inicial, vamos adicionar as ferramentas que serão usadas diariamente ao longo da sprint.",
            ],
            bullets: [
              "VS Code — editor principal, com extensões Prettier e ESLint",
              "Git & GitHub — versionamento e colaboração via Pull Request",
              "Docker Desktop — containerização para garantir consistência entre ambientes",
            ],
          },
          {
            heading: "Checklist rápido de instalação",
            paragraphs: [
              "Execute, no terminal, os comandos abaixo para validar que tudo está pronto:",
            ],
            bullets: [
              "`node -v` deve retornar a versão LTS (ex: v20.x.x)",
              "`git --version` deve retornar a versão instalada",
              "`code --version` deve abrir informações do VS Code",
              "`docker --version` (opcional na Fase 2)",
            ],
          },
        ],
        videos: [
          {
            title: "Configurando ambiente de desenvolvimento do zero",
            youtubeId: "ORrELERGIHs",
            duration: "15 min",
          },
          {
            title: "Git e GitHub para iniciantes",
            youtubeId: "UBAX-13g8OM",
            duration: "18 min",
          },
        ],
      },
      cta: "Ambiente configurado com sucesso",
    },
    {
      id: "step-3-codificando",
      order: 3,
      title: "Codificando a Demanda 1",
      shortDescription:
        "Com o ambiente pronto, comece a implementar a Demanda 1 da sprint.",
      requiresCompletionOf: ["step-1-profissao", "step-2-ferramentas"],
      body: {
        intro:
          "Agora que você entende a profissão e tem as ferramentas instaladas, é hora de colocar a mão no código. Esta etapa é desbloqueada apenas após concluir as anteriores, assim como em um onboarding real.",
        sections: [
          {
            heading: "Plano de ataque da Demanda 1",
            paragraphs: [
              "A Demanda 1 pede a configuração inicial do repositório e a entrega do primeiro Pull Request com um ajuste pequeno, porém significativo, no README do projeto.",
            ],
            bullets: [
              "Clonar o repositório-base da sprint",
              "Criar uma branch `feature/onboarding-dev`",
              "Realizar ajustes no README seguindo o padrão do time",
              "Abrir Pull Request descrevendo claramente as mudanças",
              "Solicitar review ao NPC Tech Lead",
            ],
          },
          {
            heading: "Critérios de aceite",
            paragraphs: [
              "O NPC Stakeholder aceitará a entrega somente se todos os critérios abaixo estiverem verdes:",
            ],
            bullets: [
              "Branch criada a partir de `main` atualizada",
              "Commits pequenos e com mensagem descritiva",
              "PR descreve contexto, mudanças e como testar",
              "CI (lint + testes) passando",
            ],
          },
        ],
        videos: [
          {
            title: "Seu primeiro Pull Request: passo a passo",
            youtubeId: "HbSjyU2vf6Y",
            duration: "10 min",
          },
        ],
      },
      cta: "Iniciar codificação da Demanda 1",
    },
  ],
};

export const WORKSPACE_CONTENT: Record<string, WorkspaceProfession> = {
  desenvolvedor: developerContent,
};

export function getWorkspaceContent(slug: string): WorkspaceProfession | null {
  return WORKSPACE_CONTENT[slug.toLowerCase()] ?? null;
}
