# DevSim Landing V2 - Fase 2: Controle de Acesso e Gerenciamento de Configurações

## Arquitetura do Banco de Dados
- [x] Estender schema com tabelas: users (completo), user_profiles, user_sessions, user_consents, password_resets
- [x] Implementar migrations com Drizzle
- [x] Adicionar índices para performance

## Autenticação e Controle de Acesso
- [x] Tela de Splash animada com logo DevSim
- [x] Tela de Login (e-mail + senha + OAuth)
- [x] Tela de Cadastro (nome, e-mail, senha, confirmação)
- [x] Tela de Recuperação de Senha (envio de link por e-mail)
- [x] Implementar hash seguro de senhas (bcrypt)
- [x] Validação de formulários (frontend + backend)
- [x] Tratamento de erros e mensagens de feedback

## Área de Perfil do Usuário
- [x] Visualizar dados pessoais
- [x] Editar nome, e-mail
- [x] Upload de foto de perfil
- [x] Editar foto de fundo
- [x] Gerenciar preferências de notificações (canal + frequência)

## Área de Segurança
- [x] Exibir política de senha
- [x] Permitir alteração de senha
- [x] Gerenciar sessões ativas
- [x] Visualizar histórico de login

## Área de Privacidade e LGPD
- [x] Exibir Política de Privacidade
- [x] Exibir Termos de Uso
- [x] Gerenciar consentimentos
- [x] Exportar dados do usuário (JSON)
- [x] Excluir conta e dados associados
- [x] Exibir política de permanência

## Área de Suporte
- [x] Formulário "Fale Conosco" (chat, e-mail, WhatsApp)
- [x] FAQ (Perguntas Frequentes)
- [x] Página "Sobre o Sistema" (nome, versão, desenvolvedor)
- [x] Avaliação do app (5 estrelas com comentários)

## Painel de Configurações
- [x] Criar layout com abas: Perfil, Segurança, Privacidade/LGPD, Suporte
- [x] Navegação entre abas
- [x] Persistência de estado

## Proteção de Rotas
- [x] Implementar ProtectedRoute component
- [x] Redirecionamento automático para login
- [x] Verificação de autenticação no backend
- [x] Tratamento de sessões expiradas

## Testes e Validação
- [x] Testes unitários com Vitest
- [x] Testes de autenticação
- [x] Testes de validação de formulários
- [x] Testes de LGPD e exportação de dados

## Limpeza e Preparação
- [x] Remover todas as menções ao Manus.ia do código
- [x] Revisar comentários e documentação
- [x] Testar fluxo completo de autenticação
- [x] Verificar responsividade em mobile/tablet/desktop
- [x] Preparar arquivos para GitHub

## Entrega
- [x] Criar checkpoint final
- [x] Preparar arquivos para upload no GitHub
- [x] Documentar funcionalidades implementadas

## Etapa 3 - Simuladores de Carreiras
- [x] Página de Seleção de Carreira (Dev, Tester, Analista, DevOps)
- [x] Página de Seleção de Metodologia (Ágil ou Cascata)
- [x] Ambiente de Simulação com Chat NPC
- [x] Tarefas Dinâmicas por Carreira
- [x] Carrossel de Curiosidades
- [x] Resumo de Sessão com Estatísticas
- [x] Histórico de Simulações no Dashboard
- [x] Procedures tRPC para Simuladores (15 procedures)
- [x] Banco de Dados com Tabelas de Simulação (7 tabelas)
- [x] Testes Unitários para Simuladores (8 testes)
- [x] Integração com Sistema de Autenticação
- [x] Proteção de Rotas para Simuladores


## Correções de Bugs Críticos
- [x] Mover splash screen para após login (não na inicialização)
- [x] Implementar autenticação com email/senha (sem forçar OAuth)
- [x] Implementar recuperação de senha com envio real de email (Resend)
- [x] Ativar funcionalidades da aba Segurança
- [x] Ativar funcionalidades da aba Privacidade/LGPD
- [x] Ativar funcionalidades da aba Suporte
- [x] Adicionar acesso aos simuladores no dashboard
- [x] Criar página "Meus Simuladores" com histórico
- [x] Testar fluxo completo de autenticação
- [x] Todos os 39 testes passando


## Reorganização do Fluxo (Etapa 3 - Novo Fluxo)
- [x] Criar Splash screen pós-login com animação
- [x] Criar Dashboard principal (AppDashboard) com seleção de carreiras
- [x] Reorganizar rotas: /splash e /app
- [x] Atualizar LoginForm para redirecionar para /splash
- [x] Atualizar SignupForm para redirecionar para /splash
- [x] Integrar seleção de carreira no dashboard
- [x] Integrar seleção de metodologia (Ágil/Cascata)
- [x] Todos os 39 testes continuam passando


## Ajuste de Fluxo Pós-Splash
- [x] Redirecionar para /my-simulations após splash (não para /app)


## Bug Fix - Logout Automático Após Login
- [x] Corrigir useCombinedAuth para não desautenticar usuários locais
- [x] Garantir que loading do OAuth não interfira com local auth
- [x] DashboardLayout não deve mostrar tela de login se houver local user
- [x] Local user prioriza sobre OAuth (não é sobreposto)
- [x] Loading retorna false quando há local user (sem esperar OAuth)


## Bug Fix - Redirecionamento OAuth Persistente
- [x] Identificar onde está sendo chamado window.location para tela OAuth (main.tsx interceptor global)
- [x] Remover redirecionamento para getLoginUrl() quando há local user
- [x] Garantir que MySimulations não redireciona com local user válido
- [x] Substituir getLoginUrl() por /auth/login local no main.tsx
- [x] Adicionar verificação hasLocalUser antes de redirecionar
- [x] 10 novos testes para OAuth redirect prevention
- [x] 63 testes passando no total


## Bug Fix - Erro "Please login" no Console
- [x] Silenciar TRPCClientError "Please login" quando há local user
- [x] Desabilitar query auth.me quando há local user no localStorage
- [x] Refatorar useLocalAuth para não chamar auth.me quando há local user
- [x] 63 testes passando após refator


## Ajuste Sidebar Navigation
- [x] Trocar label "Navigation" por "Menu"
- [x] Tornar item "Simuladores" clicável (link para /career-selection)
- [x] CareerSelection envolvida em DashboardLayout para mostrar sidebar


## Limpeza UI - Remover Sessões Ativas
- [x] Remover sub-aba "Sessões Ativas" do SecuritySettings
- [x] Remover seção/card de Sessões Ativas
- [x] 63 testes passando após simplificação


## Área Virtual de Trabalho (Demanda 1 - Desenvolvedor)
- [x] Corrigir erro 404 ao clicar em profissão — adicionada rota /workspace/:slug no App.tsx
- [x] Redirecionar para /workspace/desenvolvedor ao clicar em "Desenvolvedor"
- [x] Criar página VirtualWorkspace.tsx com DashboardLayout
- [x] Seção hero: "Área Virtual de Trabalho DevSim" + subtítulo
- [x] Card resumo da profissão ativa (Fase 1: O Desenvolvedor) com texto motivacional
- [x] Timeline visual Sprint 2 Semanas (Planning → Execução → Review → Retro)
- [x] Indicador "Demanda 1: Configuração de Ambiente" como sprint atual
- [x] Trilha de aprendizado com 3 etapas sequenciais:
  - [x] Etapa 1: "O que é a profissão" (desbloqueado) — texto + vídeo YouTube embedado
  - [x] Etapa 2: "Quais aplicativos/ferramentas" (desbloqueado após Etapa 1) — cards (Node.js, Terminal, Postman, VS Code, Git, Docker) + vídeos YouTube
  - [x] Etapa 3: "Codificando a Demanda 1" (bloqueado até concluir Etapas 1 e 2) — overlay cadeado
- [x] Modal/Player YouTube customizado (iframe embed) para assistir sem sair do portal
- [x] Persistência de progresso da trilha em localStorage
- [x] Botão "Marcar como concluído" em cada etapa
- [x] Visual de progresso (0-100%) com barra
- [x] Manter identidade visual DevSim (azul #2563eb, cards com sombra)
- [x] Testes passando (83 testes — 20 novos)
- [x] Criar checkpoint final


## Expansão das Áreas Virtuais (Tester, Analista, DevOps)
- [x] Criar conteúdo do Testador em workspaceContent.ts (sprint, demanda 1, ferramentas, trilha 3 etapas com vídeos)
- [x] Criar conteúdo do Analista em workspaceContent.ts
- [x] Criar conteúdo do DevOps em workspaceContent.ts
- [x] Habilitar todas as profissões em CareerSelection (removidos badge "Em breve" e cadeado)
- [x] Redirect funcional para todas as profissões via /workspace/:slug
- [x] Testes atualizados validando as 4 profissões (86 testes passando)
- [x] Checkpoint criado


## Mascote, FAQ e Conclusão de etapas
- [x] Tipos `FaqItem` e `MentorQuestion` adicionados em workspaceContent.ts
- [x] FAQ (6 perguntas cada) para Desenvolvedor, Tester, Analista e DevOps
- [x] Perguntas do mascote (4 por profissão) com resposta + direcionamento + exemplo
- [x] Componente `MentorChat.tsx` com mascote Dev Sim e avatar real
- [x] Componente `FaqAccordion.tsx` com dica do mentor integrada
- [x] Botão "Concluir e avançar" reforçado com feedback visual e caixa de ação
- [x] MentorChat integrado como seção Review no VirtualWorkspace
- [x] FaqAccordion integrado ao final da página
- [x] Testes adicionados (89 testes passando, 3 novos)
- [x] Checkpoint criado


## Editor de Código em Tarefas Disponíveis
- [x] Tipo TaskDefinition com language, starterCode e checks declarativos
- [x] Checks da tarefa Login (regex de e-mail, length de senha, hash, função, mensagem de erro)
- [x] Checks das outras 2 tarefas (SQL otimizado, review estruturado)
- [x] Componente TaskCodeEditor com textarea monoespaçado + botões Verificar e Submeter
- [x] runChecks executa regex/keyword e retorna passed/total/allPassed
- [x] Resumo visual com Progress, lista de checks e dicas para os que falharam
- [x] Botão de submeter só libera quando allPassed
- [x] Integrado abaixo do chat no SimulatorEnvironment (lista lateral abre o editor)
- [x] 9 testes para runChecks e cobertura das 3 tarefas (98 testes totais)
- [x] Checkpoint criado


## Rede social no rodapé
- [x] Ícone do Instagram adicionado no rodapé com link para https://www.instagram.com/devsim26/ (gradiente Insta, target=_blank, rel="noopener noreferrer", aria-label)
- [x] Checkpoint criado


## Voltar do Simulador (404 + confirmação de abandono)
- [x] Rota inexistente /simulator/careers substituída por /career-selection no SimulatorEnvironment e SessionSummary (3 ocorrências)
- [x] AlertDialog Sim/Não de "Abandonar a jornada?" antes de voltar, exibindo pontos e tarefas concluídas
- [x] Só abre o diálogo se houver progresso real (pontos, tarefa aberta ou interações)
- [x] 100 testes passando, TypeScript ok, Radix AlertDialog já disponível
- [x] Checkpoint criado


## Contato e Publicação no GitHub
- [x] Seção #contact criada com Card Contato Direto (mailto:devisim26@gmail.com)
- [x] Card Redes Sociais com ícone clicável do Instagram (@devsim26)
- [x] Link Contato do rodapé e do menu agora apontam para #contact
- [x] Repositório privado publicado em https://github.com/julioliins/devsim-landing-v2


## Publicar em julioliins/devsim-landing
- [x] Repositório existente (público) confirmado em https://github.com/julioliins/devsim-landing
- [x] Remote `devsim-landing` adicionado e push forçado da branch main (commit a7ae57b)
- [x] Branch `gh-pages` antiga preservada


## README de apresentação (pitch 10 min)
- [x] README escrito com roteiro por blocos de tempo, problema/solução, demo ao vivo, diferenciais e métricas
- [x] Push realizado em julioliins/devsim-landing (commit a31ffc8) e julioliins/devsim-landing-v2


## Download do projeto
- [x] ZIP gerado em /home/ubuntu/Downloads/devsim-landing.zip (342 KB, sem node_modules)
- [x] Instruções de uso (clone e ZIP) enviadas


## Reformulação da Landing (rubrica + Start Bootstrap)
- [x] companyInfo.ts com história, propósito, MVV, equipe (Julio, Alexandre, Carlos), modelo comercial freemium
- [x] Hero estilo Start Bootstrap com mascote DevSim à direita
- [x] Seção #sobre (Quem Somos, história em 2 parágrafos, propósito)
- [x] Seção #mvv com Missão, Visão e 4 Valores
- [x] Seção #equipe com organograma (3 cards: Julio CEO, Alexandre Produto, Carlos Conteúdo)
- [x] Seção #produto com nome, logo do mascote, descrição e público-alvo
- [x] Seção #funcionalidades com 6 cards de funcionalidades + icônes
- [x] Seção de Diferenciais Competitivos (4 itens)
- [x] Seção #acesso com modelo Freemium e plataformas Web/Mobile
- [x] Seção de Fluxo de Uso em 4 passos
- [x] Seção #contato com e-mail devisim26@gmail.com + ícone Instagram @devsim26
- [x] Footer com links de navegação e CTAs
- [x] 3 posts gerados (apresentação, produto, valor) + INSTAGRAM_POSTS.md com legendas
- [x] 12 testes adicionais (112 testes totais passando)
- [x] Push final em julioliins/devsim-landing (commit 4808b66) e julioliins/devsim-landing-v2 (force)


## Reorganização da Landing seguindo rubrica (a → b → c → d)
- [x] Mapeamento de lacunas vs rubrica realizado
- [x] Seção Sobre (a): Quem Somos + História (2 parágrafos) + Propósito + Identidade (logo da marca + mascote no Hero)
- [x] Seção M.V.V. (a): Missão, Visão e 5 Valores em bloco dedicado
- [x] Seção Equipe (a): organograma com hierarquia (CEO no topo + linhas conectoras + co-fundadores)
- [x] Seção Produto (b): nome + logotipo do produto separado + descrição + público-alvo + 6 funcionalidades + 4 diferenciais
- [x] Seção Acesso (c): "Como contratar/utilizar" para 3 perfis + plataformas web/mobile + fluxo de uso em 4 passos
- [x] Seção Contato (a): e-mail + Instagram + formulário funcional (mailto)
- [x] Reforço de CTAs (d): "Teste Agora", "Solicite uma Demonstração" e "Saiba Mais" distribuídos na página
- [x] Ordem do menu superior preservada (Sobre, M.V.V., Equipe, Produto, Acesso, Contato)
- [x] 4 testes adicionais (116 testes totais)
- [x] Push final feito em ambos os repositórios


## Ajustes visuais (header, menu unificado, blocos removidos)
- [x] Logo maior no header (h-12/h-14) sem label "DevSim Studios"
- [x] Unificar menu Sobre + M.V.V. + Equipe em "Quem somos" (ancoragem #about)
- [x] Remover bloco "Logotipo do Produto" da seção Produto
- [x] Remover bloco "Identidade da marca" (cores) da seção Sobre
- [x] Adicionar imagens reais para os 4 cards de Funcionalidades (CDN webdev assets)
- [x] Atualizar testes (116 passando) e push GitHub
