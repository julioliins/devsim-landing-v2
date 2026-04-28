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
  Bug,
  Workflow,
  ListChecks,
  ClipboardList,
  Cloud,
  Server,
  Activity,
  Layers,
  Figma,
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

// -----------------------------------------------------------------------------
// TESTADOR (QA)
// -----------------------------------------------------------------------------
const testerContent: WorkspaceProfession = {
  slug: "tester",
  name: "Testador",
  icon: TestTube2,
  tagline: "Garantia de Qualidade em Sprints Ágeis",
  hero:
    "O profissional de QA é o guardião da qualidade. No DevSim, você vai planejar casos de teste, identificar bugs antes que cheguem ao usuário final e validar entregas com base nos critérios de aceite definidos pelo Product Owner.",
  objective:
    "Concluir esta trilha para liberar o ambiente de execução e automação de testes da Demanda 1.",
  currentDemand: {
    number: 1,
    title: "Plano de Testes da Sprint",
    description:
      "Construir o plano de testes inicial para a feature em desenvolvimento, mapeando cenários positivos, negativos e de borda, além de configurar a ferramenta de gestão de bugs.",
    sprintDayRange: "Dia 1 ao 5",
    acceptanceCriteria: [
      "Plano de testes documentado com cenários principais",
      "Ferramenta de gestão de bugs configurada (ex: Jira)",
      "Postman/Insomnia instalado para testes de API",
      "Pelo menos 3 casos de teste cadastrados",
    ],
  },
  sprint: [
    {
      id: "planning",
      name: "Planning",
      description: "Refinamento de critérios de aceite com o time.",
      days: "Dia 0",
    },
    {
      id: "execucao",
      name: "Execução",
      description: "Criação e execução de casos de teste.",
      days: "Dia 1 ao 5",
      active: true,
    },
    {
      id: "review",
      name: "Review",
      description: "Validação das entregas com o stakeholder.",
      days: "Dia 8",
    },
    {
      id: "retro",
      name: "Retrospectiva",
      description: "Revisão de bugs encontrados e melhorias de processo.",
      days: "Dia 10",
    },
  ],
  tools: [
    {
      name: "Postman",
      icon: Package,
      description: "Criação e execução de testes de API.",
      essential: true,
      installUrl: "https://www.postman.com/downloads/",
    },
    {
      name: "Jira",
      icon: Bug,
      description: "Registro e acompanhamento de bugs e tarefas.",
      essential: true,
      installUrl: "https://www.atlassian.com/software/jira",
    },
    {
      name: "VS Code",
      icon: Code2,
      description: "Editor para escrever scripts de teste e documentação.",
      essential: true,
      installUrl: "https://code.visualstudio.com/",
    },
    {
      name: "Cypress",
      icon: TestTube2,
      description: "Framework para automação de testes end-to-end.",
      essential: true,
      installUrl: "https://www.cypress.io/",
    },
    {
      name: "Git & GitHub",
      icon: GitBranch,
      description: "Versionamento dos scripts de teste e colaboração.",
      essential: true,
      installUrl: "https://git-scm.com/",
    },
    {
      name: "Browser DevTools",
      icon: Terminal,
      description: "Inspeção de elementos, rede e console para debug.",
      essential: false,
    },
  ],
  learningPath: [
    {
      id: "step-1-profissao",
      order: 1,
      title: "O que é a profissão",
      shortDescription:
        "Entenda o papel do testador moderno e sua importância em times ágeis.",
      requiresCompletionOf: [],
      body: {
        intro:
          "O QA não é mais aquele profissional que entra apenas no final do projeto. Hoje, ele participa de toda a sprint: do refinamento ao deploy, atuando como guardião da qualidade do produto.",
        sections: [
          {
            heading: "O que um testador realmente faz?",
            paragraphs: [
              "O testador combina pensamento crítico com técnica para encontrar problemas antes do usuário. Ele cria estratégias de teste, documenta cenários e, em times maduros, automatiza grande parte do trabalho repetitivo.",
              "No DevSim, você será responsável por validar entregas dos NPCs desenvolvedores e reportar bugs com clareza para o Product Owner.",
            ],
            bullets: [
              "Definir estratégia e plano de testes",
              "Executar testes manuais e automatizados",
              "Reportar bugs com passos claros de reprodução",
              "Validar critérios de aceite junto ao PO",
            ],
          },
          {
            heading: "Habilidades que você vai exercitar",
            paragraphs: [
              "Esta trilha combina conhecimento técnico de ferramentas com habilidades críticas de análise.",
            ],
            bullets: [
              "Pensamento crítico e análise de cenários",
              "Documentação clara de bugs e relatórios",
              "Automação de testes com Cypress/Selenium",
              "Comunicação assertiva com desenvolvedores",
            ],
          },
        ],
        videos: [
          {
            title: "O que faz um QA Tester de software?",
            youtubeId: "pTW_xjxKdNo",
            duration: "11 min",
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
        "Configure o ambiente local para executar testes manuais e automatizados.",
      requiresCompletionOf: ["step-1-profissao"],
      body: {
        intro:
          "Vamos preparar seu kit de QA. Você precisa de ferramentas para escrever, executar, automatizar e reportar testes durante a sprint.",
        sections: [
          {
            heading: "Setup Essencial (Fase 1)",
            paragraphs: [
              "Estas ferramentas formam a base mínima para iniciar a Demanda 1.",
            ],
            bullets: [
              "Postman — testes de API REST",
              "Jira (ou Trello) — gestão de bugs",
              "VS Code — documentação e scripts",
            ],
          },
          {
            heading: "Fase 2: Automação",
            paragraphs: [
              "Em sprints maduras, você adiciona automação ao seu fluxo.",
            ],
            bullets: [
              "Cypress — framework moderno de testes E2E",
              "Git & GitHub — versionamento dos scripts",
              "Browser DevTools — inspeção e debug",
            ],
          },
          {
            heading: "Checklist de instalação",
            paragraphs: [
              "Verifique se cada ferramenta abre corretamente antes de prosseguir.",
            ],
            bullets: [
              "Postman abre e cria uma collection de teste",
              "Jira/Trello acessível pelo navegador",
              "`code --version` retorna a versão do VS Code",
              "`npm install -g cypress` (opcional na Fase 2)",
            ],
          },
        ],
        videos: [
          {
            title: "Postman para iniciantes em QA",
            youtubeId: "3kDOvZRrdSo",
            duration: "14 min",
          },
          {
            title: "Introdução ao Cypress: testes E2E",
            youtubeId: "u8vMu7viCm8",
            duration: "16 min",
          },
        ],
      },
      cta: "Ambiente de QA configurado",
    },
    {
      id: "step-3-codificando",
      order: 3,
      title: "Executando os testes da Demanda 1",
      shortDescription:
        "Construa o plano de testes e execute os primeiros casos da sprint.",
      requiresCompletionOf: ["step-1-profissao", "step-2-ferramentas"],
      body: {
        intro:
          "Com ambiente pronto, você vai elaborar o plano de testes da Demanda 1 e executar os primeiros casos, registrando bugs encontrados.",
        sections: [
          {
            heading: "Plano de ataque",
            paragraphs: [
              "A Demanda 1 pede um plano de testes para a feature em desenvolvimento, com pelo menos 3 casos de teste documentados.",
            ],
            bullets: [
              "Mapear cenários positivos, negativos e de borda",
              "Cadastrar casos no Jira/Trello",
              "Executar testes manuais",
              "Reportar bugs com passos de reprodução claros",
            ],
          },
          {
            heading: "Critérios de aceite",
            paragraphs: [
              "O PO aceita a entrega quando todos os itens abaixo são atendidos:",
            ],
            bullets: [
              "Plano documentado e revisado com o time",
              "Mínimo de 3 casos de teste cadastrados",
              "Bugs reportados com evidências (screenshot/log)",
              "Cobertura dos critérios de aceite da feature",
            ],
          },
        ],
        videos: [
          {
            title: "Como escrever bons casos de teste",
            youtubeId: "CFR1MR5kZNc",
            duration: "12 min",
          },
        ],
      },
      cta: "Iniciar execução da Demanda 1",
    },
  ],
};

// -----------------------------------------------------------------------------
// ANALISTA (Negócios / Sistemas)
// -----------------------------------------------------------------------------
const analystContent: WorkspaceProfession = {
  slug: "analista",
  name: "Analista",
  icon: FileText,
  tagline: "Tradução de Negócios em Requisitos Técnicos",
  hero:
    "O analista é a ponte entre o time técnico e os stakeholders. No DevSim, você vai conduzir reuniões, levantar requisitos, modelar processos e garantir que o time entenda exatamente o que precisa ser entregue.",
  objective:
    "Concluir esta trilha para liberar o ambiente de documentação e modelagem da Demanda 1.",
  currentDemand: {
    number: 1,
    title: "Levantamento de Requisitos",
    description:
      "Conduzir o levantamento de requisitos da nova feature, documentando histórias de usuário, critérios de aceite e regras de negócio para que o time técnico possa estimar e desenvolver.",
    sprintDayRange: "Dia 1 ao 5",
    acceptanceCriteria: [
      "Histórias de usuário escritas no formato INVEST",
      "Critérios de aceite definidos em Gherkin (Given/When/Then)",
      "Diagrama de fluxo da feature documentado",
      "Backlog refinado com o Product Owner",
    ],
  },
  sprint: [
    {
      id: "planning",
      name: "Planning",
      description: "Refinamento e estimativa do backlog com o time.",
      days: "Dia 0",
    },
    {
      id: "execucao",
      name: "Execução",
      description: "Documentação e refinamento contínuo de requisitos.",
      days: "Dia 1 ao 5",
      active: true,
    },
    {
      id: "review",
      name: "Review",
      description: "Validação das entregas com o stakeholder.",
      days: "Dia 8",
    },
    {
      id: "retro",
      name: "Retrospectiva",
      description: "Ajustes no processo de análise e descoberta.",
      days: "Dia 10",
    },
  ],
  tools: [
    {
      name: "Notion",
      icon: ClipboardList,
      description: "Documentação de requisitos e bases de conhecimento.",
      essential: true,
      installUrl: "https://www.notion.so/",
    },
    {
      name: "Jira",
      icon: ListChecks,
      description: "Gestão do backlog e histórias de usuário.",
      essential: true,
      installUrl: "https://www.atlassian.com/software/jira",
    },
    {
      name: "Miro",
      icon: Workflow,
      description: "Modelagem de processos, jornadas e fluxos.",
      essential: true,
      installUrl: "https://miro.com/",
    },
    {
      name: "Figma",
      icon: Figma,
      description: "Inspeção de wireframes e protótipos do time de UX.",
      essential: true,
      installUrl: "https://www.figma.com/",
    },
    {
      name: "Google Workspace",
      icon: FileText,
      description: "Docs e Sheets para documentação colaborativa.",
      essential: false,
      installUrl: "https://workspace.google.com/",
    },
    {
      name: "draw.io",
      icon: Layers,
      description: "Diagramas de fluxo, BPMN e arquitetura.",
      essential: false,
      installUrl: "https://app.diagrams.net/",
    },
  ],
  learningPath: [
    {
      id: "step-1-profissao",
      order: 1,
      title: "O que é a profissão",
      shortDescription:
        "Entenda o papel do analista em times de produto modernos.",
      requiresCompletionOf: [],
      body: {
        intro:
          "O analista é quem garante que o time esteja construindo o produto certo. Ele transforma necessidades vagas de negócio em requisitos claros, testáveis e priorizados.",
        sections: [
          {
            heading: "O que um analista realmente faz?",
            paragraphs: [
              "O analista entrevista stakeholders, modela processos, documenta requisitos e refina o backlog junto ao Product Owner. Ele também valida se o que foi entregue atende ao que foi solicitado.",
              "No DevSim, você conduzirá reuniões de descoberta com NPCs e produzirá a documentação que orienta o time técnico.",
            ],
            bullets: [
              "Levantar requisitos com stakeholders",
              "Escrever histórias de usuário e critérios de aceite",
              "Modelar fluxos e processos de negócio",
              "Refinar e priorizar o backlog",
            ],
          },
          {
            heading: "Habilidades que você vai exercitar",
            paragraphs: [
              "Habilidades de comunicação e organização são tão importantes quanto técnicas específicas.",
            ],
            bullets: [
              "Escuta ativa e entrevistas estruturadas",
              "Escrita clara em Gherkin (Given/When/Then)",
              "Modelagem de processos com BPMN",
              "Facilitação de reuniões de refinamento",
            ],
          },
        ],
        videos: [
          {
            title: "O que faz um Analista de Negócios?",
            youtubeId: "YzhMtwtwI0Y",
            duration: "10 min",
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
        "Configure o ambiente para documentar e modelar requisitos.",
      requiresCompletionOf: ["step-1-profissao"],
      body: {
        intro:
          "O analista trabalha principalmente com ferramentas de documentação, modelagem visual e gestão de backlog. Vamos configurar seu kit básico.",
        sections: [
          {
            heading: "Setup Essencial (Fase 1)",
            paragraphs: [
              "Estas ferramentas são usadas diariamente no levantamento de requisitos.",
            ],
            bullets: [
              "Notion — base de conhecimento e documentação",
              "Jira — histórias de usuário e backlog",
              "Miro — modelagem visual de fluxos e jornadas",
            ],
          },
          {
            heading: "Fase 2: Modelagem Avançada",
            paragraphs: [
              "Adicione ferramentas para diagramas mais técnicos.",
            ],
            bullets: [
              "Figma — inspeção de protótipos",
              "draw.io — BPMN e diagramas de arquitetura",
              "Google Docs — documentação colaborativa",
            ],
          },
          {
            heading: "Checklist de instalação",
            paragraphs: [
              "Confirme acesso a cada ferramenta antes de prosseguir.",
            ],
            bullets: [
              "Notion: workspace pessoal criado",
              "Jira/Trello: acesso ao board",
              "Miro: primeiro board criado",
              "Figma: navegação em modo viewer disponível",
            ],
          },
        ],
        videos: [
          {
            title: "Como usar o Miro para modelagem",
            youtubeId: "_Ot9D5Hfu6E",
            duration: "13 min",
          },
          {
            title: "Histórias de usuário: o jeito certo",
            youtubeId: "AT0p2T1QrA8",
            duration: "15 min",
          },
        ],
      },
      cta: "Ambiente de análise configurado",
    },
    {
      id: "step-3-codificando",
      order: 3,
      title: "Documentando a Demanda 1",
      shortDescription:
        "Conduza o levantamento de requisitos e produza a documentação da feature.",
      requiresCompletionOf: ["step-1-profissao", "step-2-ferramentas"],
      body: {
        intro:
          "Agora você vai conduzir o levantamento da Demanda 1, escrever as histórias de usuário e modelar o fluxo principal da feature.",
        sections: [
          {
            heading: "Plano de ataque",
            paragraphs: [
              "A Demanda 1 pede a documentação completa de uma nova feature, com histórias de usuário e diagrama de fluxo.",
            ],
            bullets: [
              "Conduzir reunião de descoberta com NPC stakeholder",
              "Escrever histórias INVEST no Jira",
              "Definir critérios de aceite em Gherkin",
              "Desenhar fluxo principal no Miro",
              "Refinar com o time técnico",
            ],
          },
          {
            heading: "Critérios de aceite",
            paragraphs: [
              "O Product Owner aceita a entrega quando:",
            ],
            bullets: [
              "Histórias seguem o formato INVEST",
              "Critérios de aceite estão em Gherkin",
              "Diagrama cobre o fluxo principal",
              "Refinamento foi conduzido com o time",
            ],
          },
        ],
        videos: [
          {
            title: "Critérios de aceite com Gherkin (BDD)",
            youtubeId: "o8FKaaTyhJk",
            duration: "11 min",
          },
        ],
      },
      cta: "Iniciar documentação da Demanda 1",
    },
  ],
};

// -----------------------------------------------------------------------------
// DEVOPS
// -----------------------------------------------------------------------------
const devopsContent: WorkspaceProfession = {
  slug: "devops",
  name: "DevOps",
  icon: Zap,
  tagline: "Automação, Infraestrutura e Entrega Contínua",
  hero:
    "O profissional DevOps une desenvolvimento e operações. No DevSim, você vai automatizar pipelines, configurar infraestrutura como código e garantir que o software seja entregue de forma rápida, confiável e observável.",
  objective:
    "Concluir esta trilha para liberar o ambiente de pipelines e infraestrutura da Demanda 1.",
  currentDemand: {
    number: 1,
    title: "Configuração do Pipeline CI/CD",
    description:
      "Configurar o pipeline inicial de integração contínua, contendo lint, testes e build automatizado, além de preparar o ambiente local com Docker para que toda a equipe trabalhe com o mesmo setup.",
    sprintDayRange: "Dia 1 ao 5",
    acceptanceCriteria: [
      "Docker Desktop instalado e rodando container de teste",
      "Pipeline CI configurado no GitHub Actions",
      "Lint + testes executando automaticamente em cada PR",
      "Documentação do fluxo de deploy publicada",
    ],
  },
  sprint: [
    {
      id: "planning",
      name: "Planning",
      description: "Definição de pipelines e critérios de qualidade.",
      days: "Dia 0",
    },
    {
      id: "execucao",
      name: "Execução",
      description: "Implementação de automações e infraestrutura.",
      days: "Dia 1 ao 5",
      active: true,
    },
    {
      id: "review",
      name: "Review",
      description: "Demonstração do pipeline ao time técnico.",
      days: "Dia 8",
    },
    {
      id: "retro",
      name: "Retrospectiva",
      description: "Análise de métricas DORA e melhorias contínuas.",
      days: "Dia 10",
    },
  ],
  tools: [
    {
      name: "Docker",
      icon: Container,
      description: "Containerização e isolamento de ambientes.",
      essential: true,
      installUrl: "https://www.docker.com/products/docker-desktop/",
    },
    {
      name: "Git & GitHub Actions",
      icon: GitBranch,
      description: "Versionamento e pipelines CI/CD nativos.",
      essential: true,
      installUrl: "https://github.com/features/actions",
    },
    {
      name: "Terminal / Zsh",
      icon: Terminal,
      description: "Onde 90% do trabalho de DevOps acontece.",
      essential: true,
    },
    {
      name: "VS Code",
      icon: Code2,
      description:
        "Editor com extensões para YAML, Docker e Terraform.",
      essential: true,
      installUrl: "https://code.visualstudio.com/",
    },
    {
      name: "Cloud Provider (AWS/GCP/Azure)",
      icon: Cloud,
      description: "Plataforma de nuvem para hospedar a aplicação.",
      essential: false,
      installUrl: "https://aws.amazon.com/free/",
    },
    {
      name: "Grafana / Prometheus",
      icon: Activity,
      description: "Observabilidade e monitoramento de métricas.",
      essential: false,
      installUrl: "https://grafana.com/",
    },
  ],
  learningPath: [
    {
      id: "step-1-profissao",
      order: 1,
      title: "O que é a profissão",
      shortDescription:
        "Entenda como o DevOps acelera entregas e estabiliza operações.",
      requiresCompletionOf: [],
      body: {
        intro:
          "DevOps não é um cargo, é uma cultura. É a união de desenvolvimento e operações para entregar valor de forma contínua, com qualidade e observabilidade.",
        sections: [
          {
            heading: "O que um DevOps realmente faz?",
            paragraphs: [
              "O DevOps automatiza tudo que pode ser repetido: builds, testes, deploys, provisionamento de infraestrutura. Também é responsável por monitorar a saúde da aplicação em produção.",
              "No DevSim, você vai construir o pipeline que valida e entrega o código do time, garantindo que tudo funcione em qualquer ambiente.",
            ],
            bullets: [
              "Automatizar pipelines CI/CD",
              "Provisionar infraestrutura como código",
              "Configurar observabilidade e alertas",
              "Garantir segurança e confiabilidade da entrega",
            ],
          },
          {
            heading: "Habilidades que você vai exercitar",
            paragraphs: [
              "Mistura de scripting, infraestrutura e cultura colaborativa.",
            ],
            bullets: [
              "Scripts em Bash e YAML",
              "Containerização com Docker",
              "Pipelines em GitHub Actions / GitLab CI",
              "Métricas DORA (lead time, MTTR, frequência)",
            ],
          },
        ],
        videos: [
          {
            title: "O que faz um Engenheiro DevOps?",
            youtubeId: "j5Zsa_eOXeY",
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
        "Configure o ambiente para automações e containers.",
      requiresCompletionOf: ["step-1-profissao"],
      body: {
        intro:
          "O DevOps precisa de um setup robusto: terminal, containers, controle de versão e acesso à nuvem. Vamos configurar passo a passo.",
        sections: [
          {
            heading: "Setup Essencial (Fase 1)",
            paragraphs: [
              "O mínimo para iniciar a automação do pipeline.",
            ],
            bullets: [
              "Docker Desktop — containers locais",
              "Git & GitHub — versionamento e Actions",
              "Terminal/Zsh — sua principal ferramenta",
            ],
          },
          {
            heading: "Fase 2: Nuvem e Observabilidade",
            paragraphs: [
              "Em sprints maduras você adiciona infra na nuvem e monitoramento.",
            ],
            bullets: [
              "Conta gratuita em AWS/GCP/Azure",
              "Grafana + Prometheus para métricas",
              "VS Code com extensões Docker e YAML",
            ],
          },
          {
            heading: "Checklist de instalação",
            paragraphs: [
              "Valide cada item no terminal antes de seguir.",
            ],
            bullets: [
              "`docker --version` retorna a versão instalada",
              "`docker run hello-world` executa com sucesso",
              "`git --version` retorna a versão",
              "Repositório de teste com GitHub Actions habilitado",
            ],
          },
        ],
        videos: [
          {
            title: "Docker para iniciantes",
            youtubeId: "Ej0yMQU2_Z8",
            duration: "18 min",
          },
          {
            title: "GitHub Actions: primeiro pipeline CI",
            youtubeId: "R8_veQiYBjI",
            duration: "15 min",
          },
        ],
      },
      cta: "Ambiente DevOps configurado",
    },
    {
      id: "step-3-codificando",
      order: 3,
      title: "Configurando o pipeline da Demanda 1",
      shortDescription:
        "Construa o pipeline CI/CD inicial com lint, testes e build.",
      requiresCompletionOf: ["step-1-profissao", "step-2-ferramentas"],
      body: {
        intro:
          "Com o ambiente pronto, você vai criar o pipeline CI da Demanda 1 usando GitHub Actions, garantindo que cada PR seja validado automaticamente.",
        sections: [
          {
            heading: "Plano de ataque",
            paragraphs: [
              "A Demanda 1 pede um pipeline funcional com 3 etapas: lint, test e build.",
            ],
            bullets: [
              "Criar arquivo `.github/workflows/ci.yml`",
              "Configurar job de lint com Node",
              "Adicionar job de testes automatizados",
              "Adicionar job de build do projeto",
              "Documentar o pipeline no README",
            ],
          },
          {
            heading: "Critérios de aceite",
            paragraphs: [
              "O Tech Lead aceita a entrega quando:",
            ],
            bullets: [
              "Pipeline executa sem erros em cada PR",
              "Falhas de lint ou teste bloqueiam o merge",
              "Documentação publicada no README",
              "Tempo total do pipeline < 5 minutos",
            ],
          },
        ],
        videos: [
          {
            title: "Construindo seu primeiro pipeline CI/CD",
            youtubeId: "YLtlz88zrLg",
            duration: "14 min",
          },
        ],
      },
      cta: "Iniciar configuração do pipeline",
    },
  ],
};

export const WORKSPACE_CONTENT: Record<string, WorkspaceProfession> = {
  desenvolvedor: developerContent,
  tester: testerContent,
  analista: analystContent,
  devops: devopsContent,
};

export function getWorkspaceContent(slug: string): WorkspaceProfession | null {
  return WORKSPACE_CONTENT[slug.toLowerCase()] ?? null;
}
