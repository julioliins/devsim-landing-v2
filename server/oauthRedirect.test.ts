import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * Tests for OAuth redirect prevention logic in main.tsx
 * Validates that local users are NOT redirected to OAuth login
 */

const LOCAL_AUTH_KEY = "devsim-local-auth";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
  };
})();

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
  (global as any).window = {
    localStorage: localStorageMock,
    location: { pathname: "/my-simulations", href: "" },
  };
});

// Replicate the hasLocalUser logic from main.tsx
const hasLocalUser = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return Boolean((global as any).window.localStorage.getItem(LOCAL_AUTH_KEY));
  } catch {
    return false;
  }
};

// Replicate the redirect logic
const shouldRedirectToLogin = (currentPath: string, hasLocal: boolean): {
  shouldRedirect: boolean;
  destination?: string;
} => {
  if (hasLocal) {
    return { shouldRedirect: false };
  }

  if (currentPath.startsWith("/auth/") || currentPath === "/") {
    return { shouldRedirect: false };
  }

  return { shouldRedirect: true, destination: "/auth/login" };
};

describe("OAuth Redirect Prevention", () => {
  it("does not redirect when local user exists", () => {
    localStorageMock.setItem(LOCAL_AUTH_KEY, JSON.stringify({ id: 1, email: "test@test.com", name: "Test" }));

    const result = shouldRedirectToLogin("/my-simulations", hasLocalUser());
    expect(result.shouldRedirect).toBe(false);
  });

  it("does not redirect when on auth pages", () => {
    const result = shouldRedirectToLogin("/auth/login", false);
    expect(result.shouldRedirect).toBe(false);
  });

  it("does not redirect when on signup page", () => {
    const result = shouldRedirectToLogin("/auth/signup", false);
    expect(result.shouldRedirect).toBe(false);
  });

  it("does not redirect when on landing page", () => {
    const result = shouldRedirectToLogin("/", false);
    expect(result.shouldRedirect).toBe(false);
  });

  it("redirects to local login (not OAuth) when on protected page without local user", () => {
    const result = shouldRedirectToLogin("/my-simulations", false);
    expect(result.shouldRedirect).toBe(true);
    expect(result.destination).toBe("/auth/login");
  });

  it("redirects to /auth/login (not OAuth URL) for dashboard", () => {
    const result = shouldRedirectToLogin("/dashboard", false);
    expect(result.shouldRedirect).toBe(true);
    expect(result.destination).toBe("/auth/login");
    // Should NOT contain manus oauth URL
    expect(result.destination).not.toContain("manus");
    expect(result.destination).not.toContain("oauth");
  });

  it("does not redirect when local user exists, even on protected pages", () => {
    localStorageMock.setItem(
      LOCAL_AUTH_KEY,
      JSON.stringify({ id: 1, email: "user@test.com", name: "User" })
    );

    const protectedPaths = [
      "/my-simulations",
      "/dashboard",
      "/career-selection",
      "/methodology-selection",
      "/simulator",
      "/session-summary",
    ];

    protectedPaths.forEach((path) => {
      const result = shouldRedirectToLogin(path, hasLocalUser());
      expect(result.shouldRedirect).toBe(false);
    });
  });

  it("hasLocalUser returns false when storage is empty", () => {
    expect(hasLocalUser()).toBe(false);
  });

  it("hasLocalUser returns true when user is stored", () => {
    localStorageMock.setItem(LOCAL_AUTH_KEY, JSON.stringify({ id: 1, name: "Test", email: "test@test.com" }));
    expect(hasLocalUser()).toBe(true);
  });

  it("hasLocalUser returns false when localStorage throws", () => {
    const errorMock = vi.fn(() => { throw new Error("Storage disabled"); });
    (global as any).window.localStorage.getItem = errorMock;
    expect(hasLocalUser()).toBe(false);
  });
});
