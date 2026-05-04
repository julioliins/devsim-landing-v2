# DevSim Studios

> **Transforme teoria em prática com simuladores reais de carreira em tecnologia.**

Plataforma educacional que simula o dia a dia de um profissional de TI dentro de um time virtual com sprint Scrum, mascote-mentor, trilha de aprendizado sequencial e tarefas de código avaliadas automaticamente. Quatro carreiras já habilitadas: **Desenvolvedor**, **Testador (QA)**, **Analista de Negócios** e **DevOps**.

---

## Acesso

| Recurso | Link |
|---|---|
| Aplicação publicada | https://devsim2-xqvbmfbi.manus.space |
| Código-fonte | https://github.com/julioliins/devsim-landing |
| Instagram | https://www.instagram.com/devsim26/ |
| Contato | devisim26@gmail.com |

---

## Roteiro de Apresentação (10 minutos)

A apresentação está pensada para três avaliadores e segue uma estrutura de **problema → solução → demonstração ao vivo → diferenciais → próximos passos**.

| Tempo | Bloco | O que mostrar |
|---|---|---|
| 0:00 – 1:30 | **Abertura e problema** | Faculdade ensina teoria, mercado cobra prática. Estagiários levam 6+ meses para "se virar" num time. |
| 1:30 – 2:30 | **Solução em uma frase** | Mostra a Home: simulador que coloca o aluno dentro de um time virtual rodando Scrum. |
| 2:30 – 5:30 | **Demonstração ao vivo** | Login → Seleção de carreira → Área Virtual do Desenvolvedor → Trilha sequencial → Vídeo embedado → Conclusão de etapa → Mascote DevSim na fase Review → FAQ. |
| 5:30 – 7:30 | **Simulador de código** | Abre uma Tarefa Disponível, cola código, clica em "Verificar solução" e mostra checklist automático aprovando/reprovando requisitos. |
| 7:30 – 8:30 | **Cobertura e arquitetura** | 4 profissões habilitadas, 100 testes automatizados, stack moderna, banco MySQL, OAuth pronto. |
| 8:30 – 9:30 | **Diferenciais e tração** | Mascote interativo, sprint quinzenal, contexto de mercado real, Instagram ativo (@devsim26). |
| 9:30 – 10:00 | **Encerramento** | Próximos passos, convite para teste, CTA para contato. |

> **Dica de oratória**: deixar a aba do site já aberta na seleção de carreira antes de começar. A demonstração ao vivo precisa de no máximo 3 minutos para impactar.

---

## O Problema que Resolvemos

A maior parte dos cursos de TI ensina **conteúdo isolado** (uma linguagem, um framework, um conceito). O mercado, no entanto, cobra do profissional **três competências combinadas**: trabalhar em sprints, conversar com stakeholders e entregar código que passa em revisão. Estagiários levam meses até montar essa visão sistêmica, e empresas pagam pela curva de aprendizado.

O **DevSim** entrega essa vivência **antes** do primeiro emprego, num ambiente seguro onde o aluno pode errar, experimentar e ser orientado por um mentor virtual.

---

## A Solução em Três Camadas

### 1. Carreira escolhida vira um time virtual

Ao escolher Desenvolvedor (ou Tester, Analista, DevOps), o aluno entra numa **Área Virtual** que reproduz a estrutura de um squad real: sprint de duas semanas dividido em Planning, Execução, Review e Retrospectiva. O sistema indica em qual fase ele está e qual demanda precisa entregar.

### 2. Trilha de aprendizado sequencial

Cada carreira tem uma trilha em três etapas que se desbloqueiam à medida que o aluno conclui a anterior:

| Etapa | Conteúdo | Formato |
|---|---|---|
| 1. O que é a profissão | Definição, escopo e dia a dia | Texto + vídeo do YouTube embedado |
| 2. Aplicativos e ferramentas | Stack real (VS Code, Git, Postman, Docker, etc.) | Cards visuais + vídeos demonstrativos |
| 3. Codificando a Demanda 1 | Tarefa prática avaliada | Editor de código + verificação automática |

A etapa 3 só destrava quando as duas anteriores estão concluídas, simulando a progressão natural de um onboarding profissional.

### 3. Mascote-mentor e FAQ de mercado

Na fase **Review**, o mascote oficial **DevSim** entra como um chat interativo: faz quatro perguntas comuns que um Tech Lead faria, mostra a resposta correta, indica o próximo passo e dá um exemplo prático dentro do time virtual. Logo abaixo, um **FAQ acordeão** com seis dúvidas reais de mercado por profissão (salário, certificações, ferramentas, carreira) com dica extra do mentor.

---

## Diferenciais Técnicos

A plataforma foi construída pensando em **realismo**, **avaliação automática** e **escalabilidade pedagógica**.

| Diferencial | Como entrega valor |
|---|---|
| **Verificador de código com checks declarativos** | Avalia regex, palavras-chave e padrões negados. Permite cadastrar novas tarefas sem escrever código de teste. |
| **Sprint timeline conectada à demanda atual** | Recria a sensação de prazo real do mercado, não apenas conteúdo solto. |
| **Mascote-mentor com respostas contextualizadas** | Cobre dúvidas reais de iniciantes que normalmente exigem mentor humano. |
| **Diálogo de abandono de jornada** | Protege o progresso do aluno. Antes de sair, confirma e mostra o que será perdido. |
| **OAuth Manus e cookies de sessão** | Login pronto, sem precisar implementar autenticação caseira. |
| **100 testes automatizados (Vitest)** | Toda regra de negócio (carreiras, trilhas, checks de código) está coberta por testes. |

---

## Stack e Arquitetura

A aplicação é **full-stack TypeScript** com type-safety ponta a ponta via tRPC.

| Camada | Tecnologia |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4, shadcn/ui, wouter |
| Backend | Express 4, tRPC 11, superjson |
| Banco de dados | MySQL/TiDB com Drizzle ORM |
| Autenticação | OAuth Manus + JWT em cookie de sessão |
| Storage | S3 com helpers prontos |
| Testes | Vitest (100 testes, 8 arquivos) |

A separação entre `client/`, `server/`, `drizzle/` e `shared/` mantém o código organizado por responsabilidade. Procedimentos tRPC dispensam REST manual e garantem que mudanças no servidor refletem automaticamente no autocomplete do frontend.

---

## Cobertura Atual de Conteúdo

| Carreira | Trilha | Sprint | Mentor | FAQ | Tarefas |
|---|---|---|---|---|---|
| Desenvolvedor | 3 etapas | Demanda 1 ativa | 4 perguntas | 6 dúvidas | 3 tarefas |
| Testador (QA) | 3 etapas | Demanda 1 ativa | 4 perguntas | 6 dúvidas | Em expansão |
| Analista de Negócios | 3 etapas | Demanda 1 ativa | 4 perguntas | 6 dúvidas | Em expansão |
| DevOps | 3 etapas | Demanda 1 ativa | 4 perguntas | 6 dúvidas | Em expansão |

---

## O Que Mostrar Ao Vivo (sequência exata)

A sequência abaixo cabe em três minutos e cobre o coração do produto.

> **1. Login** → demonstra a integração OAuth.
>
> **2. `/career-selection`** → quatro cartões de carreira, todos habilitados.
>
> **3. `/workspace/desenvolvedor`** → mostre o card de profissão, a timeline de sprint com "Demanda 1: Configuração de Ambiente" como ativa, e role até a trilha.
>
> **4. Etapa 1 da trilha** → abra o vídeo embedado do YouTube em modal, feche, clique em **Concluir e avançar**.
>
> **5. Etapa 2** → mostre os cards de ferramentas e clique em concluir.
>
> **6. Etapa 3 (destravada)** → mostre que a etapa antes estava bloqueada com cadeado.
>
> **7. Seção Review** → dispare uma pergunta para o mascote DevSim e mostre a resposta com direcionamento.
>
> **8. FAQ** → abra duas perguntas para mostrar a profundidade.
>
> **9. Simulador de tarefa** → vá para `/simulator/<id>`, abra **Implementar Feature de Login**, cole um código incompleto, clique em **Verificar solução** e mostre o checklist em vermelho. Complete o código, verifique de novo, e mostre tudo verde com o botão **Submeter** liberado.

---

## Métricas que Importam para a Banca

| Indicador | Valor |
|---|---|
| Profissões habilitadas | 4 |
| Trilhas sequenciais | 4 (12 etapas) |
| Vídeos curados | 12+ |
| Perguntas do mentor | 16 |
| Dúvidas no FAQ | 24 |
| Tarefas com verificação automática | 3 |
| Testes automatizados | 100 |
| Linhas de código (estimativa) | ~6.000 |
| Tempo de carregamento da Home | < 2s |

---

## Próximos Passos

Foco para os próximos sprints, alinhado ao backlog do produto:

1. **Persistência de progresso no banco** para o aluno retomar de qualquer dispositivo.
2. **Mascote conectado a LLM** respondendo perguntas livres com contexto da carreira.
3. **Demanda 2 e 3** em cada carreira para simular continuidade do sprint.
4. **Painel do educador** com métricas de turma (alunos, conclusões, tempo médio).
5. **Integração com calendário** para sincronizar deadlines com Google Calendar.

---

## Como Rodar Localmente

Clone, instale dependências, configure variáveis de ambiente e suba o dev server.

```bash
git clone https://github.com/julioliins/devsim-landing.git
cd devsim-landing
pnpm install
cp .env.example .env   # ajuste DATABASE_URL e segredos OAuth
pnpm db:push           # cria as tabelas no banco
pnpm dev               # http://localhost:3000
pnpm test              # roda os 100 testes
```

---

## Estrutura de Pastas

```
client/   → React + Tailwind, páginas, componentes e dados de conteúdo
server/   → Express, tRPC routers, helpers de banco e testes
drizzle/  → Schema e migrações do banco
shared/   → Tipos e constantes compartilhadas entre client e server
storage/  → Helpers de S3
```

---

## Equipe e Contato

Projeto desenvolvido pela equipe **DevSim Studios**.

- E-mail: **devisim26@gmail.com**
- Instagram: **[@devsim26](https://www.instagram.com/devsim26/)**
- Repositório: **[julioliins/devsim-landing](https://github.com/julioliins/devsim-landing)**

---

## Licença

Projeto educacional. Todos os direitos reservados © 2026 DevSim Studios.
