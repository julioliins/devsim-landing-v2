import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock user context
const createMockContext = (userId: number = 1): TrpcContext => ({
  user: {
    id: userId,
    openId: `user-${userId}`,
    email: `user${userId}@example.com`,
    name: `User ${userId}`,
    loginMethod: "oauth",
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
    clearCookie: vi.fn(),
  } as unknown as TrpcContext["res"],
});

describe("tRPC Routers", () => {
  describe("auth router", () => {
    it("should return current user from me query", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const user = await caller.auth.me();
      expect(user).toEqual(ctx.user);
    });

    it("should logout and clear cookie", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();
      expect(result).toEqual({ success: true });
      expect(ctx.res.clearCookie).toHaveBeenCalled();
    });
  });

  describe("profile router", () => {
    it("should get user profile", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const profile = await caller.profile.get();
      expect(profile).toHaveProperty("user");
      expect(profile.user?.id).toBe(ctx.user.id);
    });

    it("should update user profile", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.profile.update({
        name: "Updated Name",
        bio: "New bio",
        phone: "(11) 99999-9999",
      });

      expect(result).toEqual({ success: true });
    });

    it("should update notification preferences", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.profile.updateNotificationPreferences({
        notificationChannel: "email",
        notificationFrequency: "daily",
      });

      expect(result).toEqual({ success: true });
    });
  });

  describe("security router", () => {
    it("should validate password change requirements", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      // Test password mismatch
      try {
        await caller.security.changePassword({
          currentPassword: "OldPass123!",
          newPassword: "NewPass123!",
          confirmPassword: "DifferentPass123!",
        });
        expect.fail("Should throw error for mismatched passwords");
      } catch (error: any) {
        expect(error.message).toContain("não coincidem");
      }
    });

    it("should validate password strength requirements", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      // Test weak password (no special char)
      try {
        await caller.security.changePassword({
          currentPassword: "OldPass123",
          newPassword: "NewPass123",
          confirmPassword: "NewPass123",
        });
        expect.fail("Should throw error for weak password");
      } catch (error: any) {
        expect(error.message).toContain("caracteres especiais");
      }
    });

    it("should get active sessions", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const sessions = await caller.security.getSessions();
      expect(Array.isArray(sessions)).toBe(true);
      expect(sessions.length).toBeGreaterThan(0);
    });

    it("should terminate a session", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.security.terminateSession({ sessionId: 1 });
      expect(result).toEqual({ success: true });
    });
  });

  describe("privacy router", () => {
    it("should get user consents", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const consents = await caller.privacy.getConsents();
      expect(Array.isArray(consents)).toBe(true);
    });

    it("should update consent", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.privacy.updateConsent({
        consentType: "privacy_policy",
        given: true,
      });

      expect(result).toEqual({ success: true });
    });

    it("should request data export", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.privacy.requestDataExport();
      expect(result.success).toBe(true);
      expect(result.message).toContain("exportação");
    });

    it("should get export requests", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const requests = await caller.privacy.getExportRequests();
      expect(Array.isArray(requests)).toBe(true);
    });

    it("should validate account deletion confirmation", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      // Test invalid confirmation
      try {
        await caller.privacy.deleteAccount({ confirmation: "INVALID" });
        expect.fail("Should throw error for invalid confirmation");
      } catch (error: any) {
        expect(error.message).toContain("inválida");
      }
    });

    it("should delete account with correct confirmation", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.privacy.deleteAccount({ confirmation: "EXCLUIR" });
      expect(result.success).toBe(true);
      expect(result.message).toContain("30 dias");
    });
  });

  describe("support router", () => {
    it("should submit support ticket", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.support.submitTicket({
        subject: "Test Issue",
        message: "This is a test support message",
        channel: "email",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("sucesso");
    });

    it("should get user tickets", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const tickets = await caller.support.getTickets();
      expect(Array.isArray(tickets)).toBe(true);
    });

    it("should get FAQ entries", async () => {
      const caller = appRouter.createCaller(createMockContext());
      const faqEntries = await caller.support.getFaq();
      expect(Array.isArray(faqEntries)).toBe(true);
    });

    it("should submit app rating", async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.support.submitRating({
        rating: 5,
        comment: "Great platform!",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("avaliação");
    });
  });

  describe("protected procedures", () => {
    it("should require authentication for profile operations", async () => {
      const unAuthContext: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(unAuthContext);

      try {
        await caller.profile.get();
        expect.fail("Should require authentication");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });

    it("should require authentication for security operations", async () => {
      const unAuthContext: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(unAuthContext);

      try {
        await caller.security.getSessions();
        expect.fail("Should require authentication");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });
});
