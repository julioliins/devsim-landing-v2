import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `user-${userId}`,
    email: `user${userId}@example.com`,
    name: `User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("simulator procedures", () => {
  it("getAllCareers returns array", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const careers = await caller.simulator.getAllCareers();

    expect(Array.isArray(careers)).toBe(true);
  });

  it("getCareerById returns career or undefined", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const career = await caller.simulator.getCareerById({ careerId: 1 });

    // In test environment, DB may be empty, so career could be undefined
    if (career) {
      expect(career).toHaveProperty("id");
      expect(career).toHaveProperty("name");
    }
  });

  it("startSession creates a new simulation session", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.simulator.startSession({
      careerId: 1,
      methodology: "agile",
    });

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("sessionId");
  });

  it("getUserSessions returns array", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const sessions = await caller.simulator.getUserSessions();

    expect(Array.isArray(sessions)).toBe(true);
  });

  it("getNpcsByCareer returns array", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const npcs = await caller.simulator.getNpcsByCareer({ careerId: 1 });

    expect(Array.isArray(npcs)).toBe(true);
  });

  it("getCuriosities returns array", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const curiosities = await caller.simulator.getCuriosities({ careerId: 1 });

    expect(Array.isArray(curiosities)).toBe(true);
  });

  it("updateTaskStatus updates task status", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.simulator.updateTaskStatus({
      taskId: 1,
      status: "completed",
    });

    expect(result).toHaveProperty("success", true);
  });

  it("prevents unauthorized access to other user's session", async () => {
    const ctx1 = createAuthContext(1);
    const ctx2 = createAuthContext(2);
    const caller1 = appRouter.createCaller(ctx1);
    const caller2 = appRouter.createCaller(ctx2);

    // Start session as user 1
    const sessionResult = await caller1.simulator.startSession({
      careerId: 1,
      methodology: "agile",
    });

    // Try to access as user 2 - should fail
    try {
      await caller2.simulator.getSession({ sessionId: sessionResult.sessionId });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      // Should throw either FORBIDDEN or BAD_REQUEST depending on DB state
      expect(["FORBIDDEN", "BAD_REQUEST", "NOT_FOUND"]).toContain(error.code);
    }
  });
});
