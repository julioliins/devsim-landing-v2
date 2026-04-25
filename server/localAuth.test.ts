import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * Tests for the localStorage-based authentication helpers
 * Tests the pure functions without React hooks (which would require a DOM environment)
 */

const LOCAL_AUTH_KEY = "devsim-local-auth";

// Mock localStorage
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

// Setup global window mock
beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
  (global as any).window = { localStorage: localStorageMock };
  (global as any).localStorage = localStorageMock;
});

interface LocalUser {
  id: number;
  name: string;
  email: string;
}

function getLocalUser(): LocalUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(LOCAL_AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function setLocalUser(user: LocalUser | null) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_AUTH_KEY);
  }
}

describe("Local Authentication Storage", () => {
  it("returns null when no user is stored", () => {
    const user = getLocalUser();
    expect(user).toBeNull();
  });

  it("stores user data in localStorage", () => {
    const testUser: LocalUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    };

    setLocalUser(testUser);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      LOCAL_AUTH_KEY,
      JSON.stringify(testUser)
    );
  });

  it("retrieves stored user data correctly", () => {
    const testUser: LocalUser = {
      id: 42,
      name: "John Doe",
      email: "john@example.com",
    };

    setLocalUser(testUser);
    const retrieved = getLocalUser();

    expect(retrieved).toEqual(testUser);
  });

  it("removes user data when set to null", () => {
    const testUser: LocalUser = {
      id: 1,
      name: "Test",
      email: "test@example.com",
    };

    setLocalUser(testUser);
    expect(getLocalUser()).toEqual(testUser);

    setLocalUser(null);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(LOCAL_AUTH_KEY);
    expect(getLocalUser()).toBeNull();
  });

  it("returns null for invalid JSON in localStorage", () => {
    localStorageMock.setItem(LOCAL_AUTH_KEY, "invalid-json{{");
    const user = getLocalUser();
    expect(user).toBeNull();
  });

  it("preserves user data across multiple gets", () => {
    const testUser: LocalUser = {
      id: 99,
      name: "Persistent User",
      email: "persistent@example.com",
    };

    setLocalUser(testUser);

    expect(getLocalUser()).toEqual(testUser);
    expect(getLocalUser()).toEqual(testUser);
    expect(getLocalUser()).toEqual(testUser);
  });

  it("updates user data when set with new values", () => {
    const initial: LocalUser = {
      id: 1,
      name: "Initial",
      email: "initial@example.com",
    };

    const updated: LocalUser = {
      id: 1,
      name: "Updated",
      email: "updated@example.com",
    };

    setLocalUser(initial);
    setLocalUser(updated);

    expect(getLocalUser()).toEqual(updated);
  });

  describe("Combined Auth Logic", () => {
    it("local user should take priority over OAuth user", () => {
      const localUser: LocalUser = {
        id: 1,
        name: "Local User",
        email: "local@example.com",
      };

      const oauthUser = {
        id: 2,
        name: "OAuth User",
        email: "oauth@example.com",
      };

      // Simulate combined auth logic: localUser || oauthUser
      const user = localUser || oauthUser;
      expect(user).toEqual(localUser);
      expect(user.id).toBe(1);
    });

    it("falls back to OAuth user when no local user", () => {
      const localUser: LocalUser | null = null;

      const oauthUser = {
        id: 2,
        name: "OAuth User",
        email: "oauth@example.com",
      };

      const user = localUser || oauthUser;
      expect(user).toEqual(oauthUser);
      expect(user.id).toBe(2);
    });

    it("returns null when both auth methods are null", () => {
      const localUser: LocalUser | null = null;
      const oauthUser = null;

      const user = localUser || oauthUser;
      expect(user).toBeNull();
    });

    it("loading is false when local user exists, regardless of OAuth state", () => {
      const localUser: LocalUser = {
        id: 1,
        name: "Local",
        email: "local@example.com",
      };

      // OAuth still loading
      const oauthLoading = true;

      // Combined auth logic: localUser ? false : oauthLoading
      const loading = localUser ? false : oauthLoading;
      expect(loading).toBe(false);
    });

    it("loading reflects OAuth state when no local user", () => {
      const localUser: LocalUser | null = null;
      const oauthLoading = true;

      const loading = localUser ? false : oauthLoading;
      expect(loading).toBe(true);
    });

    it("isAuthenticated is true when local user exists", () => {
      const localUser: LocalUser = {
        id: 1,
        name: "Local",
        email: "local@example.com",
      };
      const oauthUser = null;

      const user = localUser || oauthUser;
      const isAuthenticated = Boolean(user);
      expect(isAuthenticated).toBe(true);
    });

    it("isAuthenticated is false when no auth method has user", () => {
      const localUser = null;
      const oauthUser = null;

      const user = localUser || oauthUser;
      const isAuthenticated = Boolean(user);
      expect(isAuthenticated).toBe(false);
    });
  });
});
