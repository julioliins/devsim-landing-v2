/**
 * Definição das tarefas disponíveis dentro do simulador, incluindo:
 *  - starterCode (código inicial carregado no editor)
 *  - language (linguagem destacada no cabeçalho)
 *  - checks (lista de verificações declarativas executadas sobre o código)
 *
 * A verificação é PROPOSITALMENTE simples (regex + keywords) porque o objetivo
 * pedagógico é fazer o aluno refletir sobre os requisitos, não avaliar
 * correção semântica absoluta do código.
 */

export type TaskDifficulty = "easy" | "medium" | "hard";
export type TaskStatus = "pending" | "in_progress" | "completed";

export interface TaskCheck {
  /** Identificador estável do check (para testes e UI). */
  id: string;
  /** Descrição humana do que se espera (ex.: "Validação de e-mail presente"). */
  label: string;
  /** Critério pedagógico — explica POR QUE esse check importa. */
  hint: string;
  /**
   * Estratégia de verificação: "regex" aplica a expressão, "keyword" procura
   * qualquer palavra da lista (case-insensitive).
   */
  type: "regex" | "keyword";
  /** Padrão regex (quando type = "regex"). */
  pattern?: string;
  /** Flags para o regex (default: "i"). */
  flags?: string;
  /** Palavras-chave aceitas (quando type = "keyword"). Match se QUALQUER uma aparecer. */
  keywords?: string[];
  /**
   * Quando true, o check passa se o padrão **NÃO** for encontrado.
   * Útil para regras como "não usar SELECT *".
   */
  negate?: boolean;
}

export interface TaskDefinition {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  points: number;
  difficulty: TaskDifficulty;
  /** Linguagem sugerida (apenas display). */
  language: string;
  /** Código de partida carregado no editor. */
  starterCode: string;
  /** Requisitos avaliados automaticamente. */
  checks: TaskCheck[];
  /** Dica opcional mostrada ao abrir a tarefa. */
  briefing?: string;
}

/**
 * Executa o conjunto de checks sobre um código e retorna o resultado
 * individual de cada verificação + estatísticas agregadas.
 */
export interface CheckResult {
  id: string;
  label: string;
  hint: string;
  passed: boolean;
}

export interface VerificationResult {
  results: CheckResult[];
  passed: number;
  total: number;
  allPassed: boolean;
}

export function runChecks(code: string, checks: TaskCheck[]): VerificationResult {
  const normalized = code ?? "";
  const results: CheckResult[] = checks.map((check) => {
    let matched = false;
    if (check.type === "regex" && check.pattern) {
      try {
        const re = new RegExp(check.pattern, check.flags ?? "i");
        matched = re.test(normalized);
      } catch {
        matched = false;
      }
    } else if (check.type === "keyword" && check.keywords) {
      const lower = normalized.toLowerCase();
      matched = check.keywords.some((kw) => lower.includes(kw.toLowerCase()));
    }
    // negate=true → passa quando NÃO encontrar o padrão
    const passed = check.negate ? !matched : matched;
    return {
      id: check.id,
      label: check.label,
      hint: check.hint,
      passed,
    };
  });
  const passed = results.filter((r) => r.passed).length;
  return {
    results,
    passed,
    total: results.length,
    allPassed: passed === results.length && results.length > 0,
  };
}

/**
 * Tarefas padrão do Simulador (fase 1 do Desenvolvedor).
 * A regra `status` inicial é sempre "pending" — o estado vem do componente.
 */
export const SIMULATOR_TASKS: TaskDefinition[] = [
  {
    id: 1,
    title: "Implementar Feature de Login",
    description: "Crie um sistema de autenticação seguro com validação de e-mail",
    status: "pending",
    points: 100,
    difficulty: "medium",
    language: "TypeScript",
    briefing:
      "Escreva uma função que receba e-mail e senha, valide o formato do e-mail, recuse senhas muito curtas e retorne um erro claro quando os dados forem inválidos. Use hash para a senha (ex.: bcrypt) e nunca compare senhas em texto puro.",
    starterCode: `// Implementar Feature de Login
// Crie a função loginUser(email, senha) seguindo os requisitos abaixo.

async function loginUser(email: string, senha: string) {
  // 1. Validar formato do e-mail com regex
  // 2. Exigir senha com tamanho mínimo (ex.: 8 caracteres)
  // 3. Fazer hash da senha antes de comparar (nunca texto puro)
  // 4. Retornar mensagem de erro clara quando inválido
  // 5. Retornar objeto de sucesso com o usuário autenticado

  return { success: false, message: "implementar" };
}

export { loginUser };
`,
    checks: [
      {
        id: "login-func",
        label: "Declara uma função/handler de login",
        hint: "Precisa existir uma função chamada loginUser ou similar que receba email e senha.",
        type: "regex",
        pattern: "function\\s+\\w*login\\w*\\s*\\(|const\\s+\\w*login\\w*\\s*=",
        flags: "i",
      },
      {
        id: "email-validation",
        label: "Possui validação de e-mail",
        hint: "Use uma regex ou biblioteca para validar o formato antes de autenticar.",
        type: "regex",
        pattern: "@[^\\s]+\\.[^\\s]+|\\.test\\(|validateEmail|isEmail|zod|yup",
        flags: "i",
      },
      {
        id: "password-length",
        label: "Exige tamanho mínimo de senha",
        hint: "Senhas com menos de 8 caracteres devem ser rejeitadas.",
        type: "regex",
        pattern: "(senha|password|pwd)[^\\n]{0,40}\\.length\\s*[<>=]",
        flags: "i",
      },
      {
        id: "password-hash",
        label: "Faz hash/criptografia da senha",
        hint: "Nunca compare senha em texto puro. Use bcrypt, argon2 ou hash equivalente.",
        type: "keyword",
        keywords: ["bcrypt", "argon2", "hash", "scrypt", "pbkdf2", "crypto."],
      },
      {
        id: "error-message",
        label: "Retorna mensagem clara de erro",
        hint: "Retorne um objeto ou lance um erro com mensagem informativa quando inválido.",
        type: "regex",
        pattern: "throw\\s+new\\s+Error|return\\s*\\{[^}]*(message|error|erro)",
        flags: "i",
      },
    ],
  },
  {
    id: 2,
    title: "Corrigir Bug de Performance",
    description: "Otimize a query do banco de dados que está lenta",
    status: "pending",
    points: 50,
    difficulty: "easy",
    language: "SQL",
    briefing:
      "A query original faz SELECT * sem índice e traz todas as linhas. Ajuste-a selecionando apenas as colunas necessárias, adicionando WHERE com filtro indexado e limitando o resultado.",
    starterCode: `-- Otimize a query abaixo.
-- Problema: SELECT * sem filtros nem índice em uma tabela com milhões de registros.

SELECT * FROM orders;

-- Reescreva abaixo com boas práticas (colunas explícitas, WHERE e LIMIT):

`,
    checks: [
      {
        id: "explicit-columns",
        label: "Seleciona colunas explícitas (evita SELECT *)",
        hint: "Nunca use SELECT * em produção. Liste só o que precisa.",
        type: "regex",
        pattern: "select\\s+[a-z_][\\w, .]*\\s+from",
        flags: "i",
      },
      {
        id: "where-clause",
        label: "Adiciona cláusula WHERE",
        hint: "Filtre pelo campo indexado (ex.: user_id, created_at).",
        type: "regex",
        pattern: "where\\s+\\w+",
        flags: "i",
      },
      {
        id: "limit-clause",
        label: "Usa LIMIT para controlar volume",
        hint: "Evite trazer milhões de linhas — pagine os resultados.",
        type: "regex",
        pattern: "limit\\s+\\d+",
        flags: "i",
      },
      {
        id: "no-star-select",
        label: "Não utiliza SELECT * no resultado final",
        hint: "Reescreva sem SELECT * — liste apenas as colunas necessárias.",
        type: "regex",
        // Procura SELECT * em qualquer linha que NÃO comece com '--' (comentário).
        // Como negate=true, o check PASSA somente quando NENHUMA linha de código
        // ativo contém SELECT *.
        pattern: "^(?!\\s*--).*select\\s+\\*",
        flags: "im",
        negate: true,
      },
    ],
  },
  {
    id: 3,
    title: "Revisar Pull Request",
    description: "Analise o código do seu colega e forneça feedback",
    status: "pending",
    points: 75,
    difficulty: "medium",
    language: "Markdown",
    briefing:
      "Escreva seu review como se fosse um comentário no GitHub: aponte ao menos um ponto positivo, um ponto a melhorar, sugira um teste automatizado e indique aprovação ou solicitação de mudanças.",
    starterCode: `# Code Review da PR #42

## Ponto positivo
- 

## Ponto a melhorar
- 

## Sugestão de teste
- 

## Decisão
- [ ] Aprovar
- [ ] Solicitar mudanças
`,
    checks: [
      {
        id: "positive-point",
        label: "Inclui ao menos um ponto positivo",
        hint: "Reviews construtivos começam reconhecendo o que está bom.",
        type: "regex",
        pattern:
          "(ponto\\s+positivo|positivo|bom|boa\\s+escolha|ficou\\s+bom|gostei)[\\s\\S]*[a-z]",
        flags: "i",
      },
      {
        id: "improvement",
        label: "Aponta ponto a melhorar",
        hint: "Sugira uma melhoria concreta (nome de variável, refatoração, nulo, etc.).",
        type: "regex",
        pattern:
          "(melhor|sugiro|poderia|recomendo|ajustar|refator|renomear|trocar)[\\s\\S]*[a-z]",
        flags: "i",
      },
      {
        id: "test-suggestion",
        label: "Sugere um teste automatizado",
        hint: "Mencione tipo de teste (unitário, integração, e2e) ou framework (vitest, jest).",
        type: "keyword",
        keywords: [
          "teste",
          "test",
          "vitest",
          "jest",
          "cypress",
          "unit",
          "integra",
          "e2e",
          "cobertura",
        ],
      },
      {
        id: "decision",
        label: "Registra decisão (aprovar ou pedir mudanças)",
        hint: "Ao final, deixe claro se aprova ou solicita mudanças.",
        type: "regex",
        pattern:
          "- \\[x\\]\\s*(aprovar|solicitar|request\\s+changes|approve)|^\\s*(approve|aprovado|mudan[cç]as)",
        flags: "im",
      },
    ],
  },
];

export function getTaskById(id: number): TaskDefinition | undefined {
  return SIMULATOR_TASKS.find((t) => t.id === id);
}
