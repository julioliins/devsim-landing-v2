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
