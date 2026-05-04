import { describe, expect, it } from "vitest";
import {
  SIMULATOR_TASKS,
  getTaskById,
  runChecks,
} from "../client/src/data/simulatorTasks";

/**
 * Testa a lógica de verificação automática que avalia o código escrito pelo
 * aluno em cada "Tarefa Disponível" do simulador. A intenção é garantir que:
 *   - As regras reprovam starterCode (estado inicial)
 *   - As regras aprovam uma solução minimamente correta
 *   - IDs de tarefas e de checks são únicos e estáveis
 */
describe("Simulator Tasks — verification engine", () => {
  it("cada tarefa tem ID, título, starterCode e pelo menos 3 checks", () => {
    expect(SIMULATOR_TASKS.length).toBeGreaterThanOrEqual(3);
    SIMULATOR_TASKS.forEach((task) => {
      expect(task.id).toBeGreaterThan(0);
      expect(task.title.length).toBeGreaterThan(4);
      expect(task.starterCode.length).toBeGreaterThan(20);
      expect(task.checks.length).toBeGreaterThanOrEqual(3);
      // IDs únicos de check dentro da tarefa
      const checkIds = task.checks.map((c) => c.id);
      expect(new Set(checkIds).size).toBe(checkIds.length);
    });
  });

  it("IDs de tarefas são únicos", () => {
    const ids = SIMULATOR_TASKS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("getTaskById retorna tarefa existente e undefined para inexistente", () => {
    expect(getTaskById(1)?.title).toContain("Login");
    expect(getTaskById(999)).toBeUndefined();
  });

  it("runChecks sobre o starterCode deixa a maioria dos checks falhando", () => {
    SIMULATOR_TASKS.forEach((task) => {
      const r = runChecks(task.starterCode, task.checks);
      // O starter é propositadamente incompleto — não pode já ser "allPassed"
      expect(r.allPassed, `starter de "${task.title}" não deve passar tudo`).toBe(false);
    });
  });

  it("runChecks com solução bem-formada aprova o Login", () => {
    const solution = `
      import bcrypt from 'bcrypt';

      async function loginUser(email: string, senha: string) {
        const emailOk = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email);
        if (!emailOk) {
          throw new Error('E-mail inválido');
        }
        if (senha.length < 8) {
          return { error: 'Senha muito curta' };
        }
        const hash = await bcrypt.hash(senha, 10);
        return { success: true, hash };
      }
    `;
    const task = getTaskById(1)!;
    const r = runChecks(solution, task.checks);
    expect(r.allPassed).toBe(true);
    expect(r.passed).toBe(r.total);
  });

  it("runChecks com query otimizada aprova TODOS os checks do Bug de Performance", () => {
    const solution = `
      SELECT id, user_id, created_at, total
      FROM orders
      WHERE user_id = 42 AND created_at > '2024-01-01'
      LIMIT 50;
    `;
    const task = getTaskById(2)!;
    const r = runChecks(solution, task.checks);
    expect(r.allPassed).toBe(true);
    expect(r.results.find((c) => c.id === "no-star-select")?.passed).toBe(true);
  });

  it("reprova solução SQL que ainda usa SELECT * (check negado)", () => {
    // Mantém where + limit + colunas explicit, mas também introduz SELECT * —
    // a regra negada deve reprovar.
    const solution = `
      SELECT * FROM orders WHERE user_id = 42 LIMIT 10;
    `;
    const task = getTaskById(2)!;
    const r = runChecks(solution, task.checks);
    expect(r.allPassed).toBe(false);
    expect(r.results.find((c) => c.id === "no-star-select")?.passed).toBe(false);
  });

  it("check negado ignora SELECT * que está dentro de comentário SQL", () => {
    const task = getTaskById(2)!;
    const noStar = task.checks.find((c) => c.id === "no-star-select")!;
    const onlyComment = `-- Antes: SELECT * FROM orders\nSELECT id FROM orders WHERE user_id = 1 LIMIT 10;`;
    const r = runChecks(onlyComment, [noStar]);
    expect(r.allPassed).toBe(true);
  });

  it("runChecks com review bem escrito aprova a Revisão de PR", () => {
    const solution = `
      # Code Review da PR #42

      ## Ponto positivo
      - Gostei da separação de responsabilidades no módulo de autenticação.

      ## Ponto a melhorar
      - Recomendo renomear a função 'x' para algo mais descritivo.

      ## Sugestão de teste
      - Adicionar um teste unitário com vitest para o caso de senha inválida.

      ## Decisão
      - [x] Solicitar mudanças
      - [ ] Aprovar
    `;
    const task = getTaskById(3)!;
    const r = runChecks(solution, task.checks);
    expect(r.allPassed).toBe(true);
  });

  it("runChecks retorna contadores coerentes", () => {
    const task = getTaskById(1)!;
    const r = runChecks("", task.checks);
    expect(r.total).toBe(task.checks.length);
    expect(r.passed).toBe(r.results.filter((x) => x.passed).length);
    expect(r.allPassed).toBe(false);
  });

  it("runChecks com type='keyword' faz match case-insensitive", () => {
    const task = getTaskById(1)!;
    const hashCheck = task.checks.find((c) => c.id === "password-hash")!;
    const r1 = runChecks("BCRYPT.hash(x)", [hashCheck]);
    const r2 = runChecks("const x = 1", [hashCheck]);
    expect(r1.allPassed).toBe(true);
    expect(r2.allPassed).toBe(false);
  });
});
