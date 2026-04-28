import { describe, it, expect, beforeEach } from "vitest";
import {
  getWorkspaceContent,
  WORKSPACE_CONTENT,
} from "../client/src/data/workspaceContent";

describe("Workspace Content (Área Virtual)", () => {
  it("retorna conteúdo para o slug 'desenvolvedor'", () => {
    const content = getWorkspaceContent("desenvolvedor");
    expect(content).not.toBeNull();
    expect(content?.slug).toBe("desenvolvedor");
    expect(content?.name).toBe("Desenvolvedor");
  });

  it("é case-insensitive (Dev e dev retornam o mesmo conteúdo)", () => {
    const a = getWorkspaceContent("Desenvolvedor");
    const b = getWorkspaceContent("desenvolvedor");
    const c = getWorkspaceContent("DESENVOLVEDOR");
    expect(a?.slug).toBe(b?.slug);
    expect(a?.slug).toBe(c?.slug);
  });

  it("retorna null para profissões não disponíveis", () => {
    expect(getWorkspaceContent("tester")).toBeNull();
    expect(getWorkspaceContent("analista")).toBeNull();
    expect(getWorkspaceContent("inexistente")).toBeNull();
  });

  it("possui exatamente 3 etapas na trilha de aprendizado", () => {
    const content = getWorkspaceContent("desenvolvedor");
    expect(content?.learningPath.length).toBe(3);
  });

  it("etapa 1 não possui pré-requisitos (desbloqueada)", () => {
    const content = getWorkspaceContent("desenvolvedor");
    const step1 = content?.learningPath.find((s) => s.order === 1);
    expect(step1?.requiresCompletionOf).toEqual([]);
  });

  it("etapa 2 exige conclusão da etapa 1", () => {
    const content = getWorkspaceContent("desenvolvedor");
    const step1 = content?.learningPath.find((s) => s.order === 1);
    const step2 = content?.learningPath.find((s) => s.order === 2);
    expect(step2?.requiresCompletionOf).toContain(step1?.id);
  });

  it("etapa 3 exige conclusão das etapas 1 e 2 (bloqueio sequencial)", () => {
    const content = getWorkspaceContent("desenvolvedor");
    const step1 = content?.learningPath.find((s) => s.order === 1);
    const step2 = content?.learningPath.find((s) => s.order === 2);
    const step3 = content?.learningPath.find((s) => s.order === 3);
    expect(step3?.requiresCompletionOf).toContain(step1?.id);
    expect(step3?.requiresCompletionOf).toContain(step2?.id);
    expect(step3?.requiresCompletionOf.length).toBe(2);
  });

  it("cada etapa possui pelo menos um vídeo do YouTube", () => {
    const content = getWorkspaceContent("desenvolvedor");
    content?.learningPath.forEach((step) => {
      expect(step.body.videos.length).toBeGreaterThanOrEqual(1);
      step.body.videos.forEach((v) => {
        expect(v.youtubeId).toBeTruthy();
        expect(typeof v.youtubeId).toBe("string");
      });
    });
  });

  it("sprint possui exatamente 4 fases (Planning, Execução, Review, Retro)", () => {
    const content = getWorkspaceContent("desenvolvedor");
    expect(content?.sprint.length).toBe(4);
    const ids = content?.sprint.map((p) => p.id) ?? [];
    expect(ids).toEqual(["planning", "execucao", "review", "retro"]);
  });

  it("exatamente uma fase da sprint está marcada como ativa", () => {
    const content = getWorkspaceContent("desenvolvedor");
    const actives = content?.sprint.filter((p) => p.active) ?? [];
    expect(actives.length).toBe(1);
    expect(actives[0].id).toBe("execucao");
  });

  it("Demanda 1 é a demanda atual com critérios de aceite", () => {
    const content = getWorkspaceContent("desenvolvedor");
    expect(content?.currentDemand.number).toBe(1);
    expect(content?.currentDemand.title).toContain("Configuração de Ambiente");
    expect(
      content?.currentDemand.acceptanceCriteria.length,
    ).toBeGreaterThanOrEqual(3);
  });

  it("inclui ferramentas essenciais descritas no PDF (Node, VS Code, Git, Docker)", () => {
    const content = getWorkspaceContent("desenvolvedor");
    const names = content?.tools.map((t) => t.name) ?? [];
    expect(names.some((n) => n.includes("Node.js"))).toBe(true);
    expect(names.some((n) => n.includes("VS Code"))).toBe(true);
    expect(names.some((n) => n.includes("Git"))).toBe(true);
    expect(names.some((n) => n.includes("Docker"))).toBe(true);
    expect(names.some((n) => n.includes("Postman"))).toBe(true);
  });

  it("WORKSPACE_CONTENT é um registry consistente", () => {
    expect(WORKSPACE_CONTENT.desenvolvedor).toBeTruthy();
    expect(Object.keys(WORKSPACE_CONTENT)).toContain("desenvolvedor");
  });
});

// -----------------------------------------------------------------------------
// Progress helpers (lógica pura de desbloqueio)
// -----------------------------------------------------------------------------
import { __workspaceProgressInternals } from "../client/src/hooks/useWorkspaceProgress";

// In-memory localStorage shim for Node test environment
class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string) {
    return this.store.has(k) ? (this.store.get(k) as string) : null;
  }
  setItem(k: string, v: string) {
    this.store.set(k, v);
  }
  removeItem(k: string) {
    this.store.delete(k);
  }
  clear() {
    this.store.clear();
  }
}

describe("useWorkspaceProgress (helpers puros)", () => {
  const { storageKey, readProgress, writeProgress } = __workspaceProgressInternals;

  beforeEach(() => {
    // @ts-expect-error injeta localStorage no escopo global para testes
    globalThis.window = { localStorage: new MemoryStorage() };
  });

  it("gera chave consistente baseada no slug (case-insensitive)", () => {
    expect(storageKey("desenvolvedor")).toBe(storageKey("DESENVOLVEDOR"));
    expect(storageKey("desenvolvedor")).toContain("desenvolvedor");
  });

  it("retorna progresso vazio quando localStorage está vazio", () => {
    const p = readProgress("desenvolvedor");
    expect(p.completedSteps).toEqual([]);
  });

  it("persiste e lê progresso corretamente", () => {
    writeProgress("desenvolvedor", {
      completedSteps: ["step-1-profissao"],
      updatedAt: 123,
    });
    const p = readProgress("desenvolvedor");
    expect(p.completedSteps).toEqual(["step-1-profissao"]);
  });

  it("isola progresso entre diferentes slugs", () => {
    writeProgress("desenvolvedor", {
      completedSteps: ["step-1-profissao"],
      updatedAt: 1,
    });
    const other = readProgress("tester");
    expect(other.completedSteps).toEqual([]);
  });

  it("retorna vazio quando o JSON armazenado está corrompido", () => {
    // @ts-expect-error acessa MemoryStorage
    globalThis.window.localStorage.setItem(
      storageKey("desenvolvedor"),
      "not-json",
    );
    const p = readProgress("desenvolvedor");
    expect(p.completedSteps).toEqual([]);
  });
});

describe("Lógica de desbloqueio sequencial", () => {
  it("desbloqueia etapa 2 apenas após concluir etapa 1", () => {
    const content = getWorkspaceContent("desenvolvedor")!;
    const step2 = content.learningPath.find((s) => s.order === 2)!;

    const isUnlocked = (completed: string[]) =>
      step2.requiresCompletionOf.every((r) => completed.includes(r));

    expect(isUnlocked([])).toBe(false);
    expect(isUnlocked(["step-1-profissao"])).toBe(true);
  });

  it("etapa 3 permanece bloqueada até ambas anteriores serem concluídas", () => {
    const content = getWorkspaceContent("desenvolvedor")!;
    const step3 = content.learningPath.find((s) => s.order === 3)!;

    const isUnlocked = (completed: string[]) =>
      step3.requiresCompletionOf.every((r) => completed.includes(r));

    expect(isUnlocked([])).toBe(false);
    expect(isUnlocked(["step-1-profissao"])).toBe(false);
    expect(isUnlocked(["step-2-ferramentas"])).toBe(false);
    expect(
      isUnlocked(["step-1-profissao", "step-2-ferramentas"]),
    ).toBe(true);
  });
});
