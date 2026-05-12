import { describe, it, expect } from "vitest";
import { company, product } from "../client/src/data/companyInfo";

describe("companyInfo (atende rubrica da landing)", () => {
  it("inclui história em ao menos 2 parágrafos", () => {
    expect(company.history.length).toBeGreaterThanOrEqual(2);
    company.history.forEach((p) => expect(p.length).toBeGreaterThan(50));
  });

  it("possui propósito definido", () => {
    expect(company.purpose).toBeTruthy();
    expect(company.purpose.length).toBeGreaterThan(40);
  });

  it("possui Missão e Visão (M.V.V.)", () => {
    expect(company.mission).toMatch(/Democratizar/);
    expect(company.vision).toMatch(/plataforma educacional/);
  });

  it("possui ao menos 3 valores", () => {
    expect(company.values.length).toBeGreaterThanOrEqual(3);
    company.values.forEach((v) => {
      expect(v.title).toBeTruthy();
      expect(v.description).toBeTruthy();
    });
  });

  it("organograma da equipe tem 3 membros com papéis", () => {
    expect(company.team.length).toBe(3);
    const names = company.team.map((m) => m.name);
    expect(names).toContain("Júlio Lins");
    expect(names).toContain("Alexandre Fernandes");
    expect(names).toContain("Carlos Eduardo");
    company.team.forEach((m) => {
      expect(m.role).toBeTruthy();
      expect(m.bio).toBeTruthy();
      expect(m.initials.length).toBeLessThanOrEqual(3);
    });
  });

  it("contato inclui e-mail e Instagram", () => {
    expect(company.contact.email).toBe("devisim26@gmail.com");
    expect(company.contact.instagram).toContain("instagram.com/devsim26");
    expect(company.contact.instagramHandle).toBe("@devsim26");
  });
});

describe("product (rubrica de apresentação do produto)", () => {
  it("possui nome, descrição e público-alvo", () => {
    expect(product.name).toBeTruthy();
    expect(product.description.length).toBeGreaterThan(80);
    expect(product.audience.length).toBeGreaterThanOrEqual(3);
  });

  it("possui ao menos 4 funcionalidades com ícone", () => {
    expect(product.features.length).toBeGreaterThanOrEqual(4);
    product.features.forEach((f) => {
      expect(f.title).toBeTruthy();
      expect(f.description).toBeTruthy();
      expect(f.icon).toBeTruthy();
    });
  });

  it("possui ao menos 4 diferenciais competitivos", () => {
    expect(product.differentials.length).toBeGreaterThanOrEqual(4);
  });

  it("descreve plataformas web e mobile", () => {
    expect(product.platforms.length).toBe(2);
    expect(product.platforms[0].toLowerCase()).toContain("web");
    expect(product.platforms[1].toLowerCase()).toContain("mobile");
  });

  it("possui fluxo de uso em 4 passos numerados", () => {
    expect(product.flow.length).toBe(4);
    product.flow.forEach((s, idx) => {
      expect(s.step).toBe(String(idx + 1).padStart(2, "0"));
    });
  });

  it("possui oferta com CTA primário e secundário", () => {
    expect(product.pricing.title).toBeTruthy();
    expect(product.pricing.cta.primary).toBeTruthy();
    expect(product.pricing.cta.secondary).toBeTruthy();
    expect(product.pricing.perks.length).toBeGreaterThanOrEqual(3);
  });
});

describe("product extras (logotipo, como contratar, CTAs)", () => {
  it("tem logotipo do produto definido", () => {
    expect(product.shortName).toBeTruthy();
    expect(product.logoBadge).toBeTruthy();
    expect(product.tagline).toBeTruthy();
  });

  it("explica como contratar/utilizar em ao menos 3 perfis", () => {
    expect(product.pricing.howToContract.length).toBeGreaterThanOrEqual(3);
  });

  it("tem 3 CTAs distintos (primary, secondary, tertiary)", () => {
    const cta = product.pricing.cta as { primary: string; secondary: string; tertiary?: string };
    expect(cta.primary).toBeTruthy();
    expect(cta.secondary).toBeTruthy();
    expect(cta.tertiary).toBeTruthy();
    expect(cta.primary).not.toBe(cta.secondary);
  });
});

describe("organograma da equipe", () => {
  it("primeiro membro é a liderança (CEO/Tech Lead/Fundador)", () => {
    expect(company.team[0].role.toLowerCase()).toMatch(/lead|ceo|fundador/);
  });
});
