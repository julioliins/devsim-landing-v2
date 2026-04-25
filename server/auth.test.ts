import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      setHeader: vi.fn(),
      clearCookie: vi.fn(),
    } as any,
  };
}

function createAuthContext(userId: number = 1): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `user-${userId}`,
      email: `user${userId}@example.com`,
      name: `User ${userId}`,
      loginMethod: "email",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      setHeader: vi.fn(),
      clearCookie: vi.fn(),
    } as any,
  };
}

describe("auth procedures", () => {
  describe("me", () => {
    it("returns null for unauthenticated users", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.me();
      expect(result).toBeNull();
    });

    it("returns user data for authenticated users", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.me();
      expect(result).toEqual(ctx.user);
    });
  });

  describe("logout", () => {
    it("clears session cookie", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.logout();
      
      expect(result).toEqual({ success: true });
      expect(ctx.res.clearCookie).toHaveBeenCalled();
    });
  });

  describe("signup", () => {
    it("validates password minimum length", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      
      try {
        await caller.auth.signup({
          name: "Test User",
          email: "test@example.com",
          password: "weak",
          confirmPassword: "weak",
        });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.message).toContain("Too small");
      }
    });

    it("validates password confirmation", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      
      try {
        await caller.auth.signup({
          name: "Test User",
          email: "test@example.com",
          password: "StrongPass123!",
          confirmPassword: "DifferentPass123!",
        });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.message).toContain("não coincidem");
      }
    });
  });

  describe("requestPasswordReset", () => {
    it("returns success message for any email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      
      const result = await caller.auth.requestPasswordReset({
        email: "test@example.com",
      });
      
      expect(result.success).toBe(true);
      expect(result.message).toContain("email");
    });
  });

  describe("resetPassword", () => {
    it("validates passwords match", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      
      try {
        await caller.auth.resetPassword({
          token: "invalid-token",
          newPassword: "NewPass123!",
          confirmPassword: "DifferentPass123!",
        });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.message).toContain("não coincidem");
      }
    });

    it("validates password minimum length", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      
      try {
        await caller.auth.resetPassword({
          token: "invalid-token",
          newPassword: "weak",
          confirmPassword: "weak",
        });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.message).toContain("Too small");
      }
    });

    it("rejects invalid tokens", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      
      try {
        await caller.auth.resetPassword({
          token: "invalid-token",
          newPassword: "ValidPass123!",
          confirmPassword: "ValidPass123!",
        });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.message).toContain("inválido");
      }
    });
  });
});
