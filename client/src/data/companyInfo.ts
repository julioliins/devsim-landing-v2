/**
 * Conteúdo institucional do DevSim Studios.
 * Centraliza textos da landing para facilitar manutenção/edição.
 */

export const company = {
  name: "DevSim Studios",
  tagline: "Transforme teoria em prática com simuladores reais de carreira em tecnologia.",
  shortDescription:
    "Plataforma educacional brasileira que coloca estudantes de tecnologia dentro de um time virtual com sprints, mentorias e tarefas avaliadas automaticamente.",
  history: [
    "O DevSim Studios nasceu em 2025 a partir da inquietação de estudantes que sentiam, na pele, a distância entre a teoria da faculdade e o ritmo do mercado de trabalho em tecnologia.",
    "Após muitas conversas com colegas, professores e profissionais já atuantes, ficou claro que faltava um ambiente onde o aprendiz pudesse errar com segurança, experimentar ferramentas reais e vivenciar dinâmicas de um time ágil antes mesmo do primeiro estágio.",
    "Foi assim que o DevSim ganhou forma: uma startup de educação aplicada que combina narrativa, simulação e mentoria virtual para formar profissionais prontos para o dia a dia das empresas de tecnologia.",
  ],
  purpose:
    "Reduzir a distância entre a sala de aula e o mercado de trabalho, formando profissionais de tecnologia mais confiantes, conectados e prontos para entregar valor desde o primeiro dia.",
  mission: "Democratizar o acesso a ambientes de prática profissional seguros e realistas.",
  vision:
    "Ser a plataforma educacional de referência para simulação em desenvolvimento de software no Brasil até 2030.",
  values: [
    {
      title: "Aprender Fazendo",
      description:
        "Acreditamos que a competência se constrói na prática. Por isso, cada conteúdo termina em um desafio aplicado.",
    },
    {
      title: "Realismo Pedagógico",
      description:
        "Simulamos ferramentas, ritos e linguagens que existem nas empresas de verdade. Nada de cenários fabricados.",
    },
    {
      title: "Inclusão e Acesso",
      description:
        "Tornamos a porta de entrada da tecnologia mais ampla, com conteúdo em português e jornadas guiadas.",
    },
    {
      title: "Mentoria Contínua",
      description:
        "Nosso mascote Dev Sim acompanha o aluno em cada etapa, transformando dúvidas em aprendizado.",
    },
    {
      title: "Impacto com Propósito",
      description:
        "Medimos sucesso pela empregabilidade e confiança que entregamos a quem nos escolhe.",
    },
  ],
  team: [
    {
      name: "Júlio Lins",
      role: "Co-fundador · Tech Lead",
      bio: "Lidera arquitetura e desenvolvimento da plataforma DevSim, garantindo realismo técnico e qualidade de código.",
      initials: "JL",
    },
    {
      name: "Alexandre Fernandes",
      role: "Co-fundador · Produto",
      bio: "Cuida da estratégia de produto, da experiência do aluno e das parcerias com instituições de ensino.",
      initials: "AF",
    },
    {
      name: "Carlos Eduardo",
      role: "Co-fundador · Conteúdo & Comunidade",
      bio: "Constrói as trilhas, vídeos e cuida das redes sociais para aproximar o DevSim dos estudantes.",
      initials: "CE",
    },
  ],
  contact: {
    email: "devisim26@gmail.com",
    instagram: "https://www.instagram.com/devsim26/",
    instagramHandle: "@devsim26",
  },
};

export const product = {
  name: "DevSim — Plataforma de Simulação de Carreira",
  shortName: "DevSim",
  logoBadge: "DS",
  tagline: "O simulador oficial de carreira em tecnologia da DevSim Studios.",
  description:
    "Um simulador de carreira em tecnologia que coloca o aluno dentro de um squad virtual rodando sprints quinzenais. Em cada sprint ele aprende a profissão, escolhe ferramentas, conversa com o mentor Dev Sim e entrega tarefas avaliadas automaticamente.",
  audience: [
    "Estudantes de cursos técnicos e superiores em Análise e Desenvolvimento de Sistemas, Engenharia de Software, Sistemas de Informação e correlatos.",
    "Profissionais em transição de carreira que buscam vivência prática antes do primeiro emprego em tecnologia.",
    "Instituições de ensino que precisam complementar a teoria com ambientes guiados de prática.",
  ],
  features: [
    {
      title: "Áreas Virtuais por Profissão",
      description:
        "Quatro carreiras já habilitadas — Desenvolvedor, Tester, Analista de Negócios e DevOps — cada uma com seu próprio time virtual, ferramentas e demandas reais.",
      icon: "Users",
    },
    {
      title: "Trilha de Aprendizado Sequencial",
      description:
        "Conteúdo desbloqueado por etapa: o que é a profissão, quais ferramentas dominar e como codificar a primeira demanda. Vídeos curados embutidos no portal.",
      icon: "GraduationCap",
    },
    {
      title: "Mentor Virtual Dev Sim",
      description:
        "O mascote conduz o aluno na fase de Review com perguntas reais, respostas direcionadas e sugestões de próximos passos personalizadas.",
      icon: "Bot",
    },
    {
      title: "Simulador de Tarefas com Verificação",
      description:
        "Editor de código integrado que avalia automaticamente se a entrega cumpre os requisitos: validação de e-mail, hash de senha, otimização SQL e mais.",
      icon: "Code2",
    },
  ],
  differentials: [
    {
      title: "Sprint Real, Não Apenas Conteúdo",
      description:
        "Diferente de plataformas tradicionais de cursos, simulamos o ciclo de duas semanas com Planning, Execução, Review e Retrospectiva.",
    },
    {
      title: "Mascote-Mentor Brasileiro",
      description:
        "O Dev Sim fala português, conhece o mercado nacional e oferece direcionamento contextualizado, não respostas genéricas de IA.",
    },
    {
      title: "Verificação Declarativa de Código",
      description:
        "Cadastrar uma nova tarefa não exige escrever testes complexos: definimos checks por regras simples e o motor avalia em milissegundos.",
    },
    {
      title: "Foco em Empregabilidade",
      description:
        "Cada etapa termina com a pergunta: como isso aparece no dia a dia da empresa? Conectamos o que se aprende ao que se entrega no estágio.",
    },
  ],
  platforms: [
    "Web (acesso por qualquer navegador moderno em desktop ou tablet).",
    "App mobile previsto para 2026, complementando os estudos com micro-desafios diários.",
  ],
  flow: [
    {
      step: "01",
      title: "Crie sua conta",
      description: "Login rápido com OAuth. Em segundos você está dentro do portal.",
    },
    {
      step: "02",
      title: "Escolha sua carreira",
      description: "Selecione entre Desenvolvedor, Tester, Analista ou DevOps.",
    },
    {
      step: "03",
      title: "Entre na Área Virtual",
      description: "Conheça seu time, sua sprint e a Demanda 1.",
    },
    {
      step: "04",
      title: "Conclua a trilha e entregue a tarefa",
      description: "Aprenda, codifique e receba o feedback automatizado do Dev Sim.",
    },
  ],
  pricing: {
    title: "Acesso Educacional Gratuito",
    description:
      "Durante a fase atual de validação, todas as funcionalidades estão disponíveis gratuitamente para estudantes e instituições parceiras. Nosso compromisso é manter um caminho de aprendizado acessível enquanto evoluímos o produto com base no feedback da comunidade.",
    howToContract: [
      "Estudantes individuais: clique em 'Teste Agora' e faça o cadastro gratuito — acesso liberado em segundos.",
      "Instituições de ensino: solicite uma demonstração e receba uma proposta de parceria personalizada.",
      "Empresas: entre em contato para customizar trilhas de onboarding e mapear talentos da plataforma.",
    ],
    cta: {
      primary: "Teste Agora Gratuitamente",
      secondary: "Solicite uma Demonstração",
      tertiary: "Saiba Mais",
    },
    perks: [
      "Acesso completo às quatro carreiras.",
      "Mentor virtual Dev Sim incluído.",
      "Verificador de código em todas as tarefas.",
      "Comunidade no Instagram com novidades semanais.",
    ],
  },
};

export type Company = typeof company;
export type Product = typeof product;
