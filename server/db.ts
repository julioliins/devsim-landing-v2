import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, userProfiles, userSessions, passwordResets, userConsents, supportTickets, dataExportRequests, faqEntries, appRatings, careers, simulationSessions, npcs, simulationTasks, curiosities, sessionSummaries } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(userId: number, data: Partial<typeof userProfiles.$inferInsert>) {
  const db = await getDb();
  if (!db) return undefined;
  
  const existing = await getUserProfile(userId);
  if (!existing) {
    return await db.insert(userProfiles).values({ userId, ...data });
  }
  
  return await db.update(userProfiles)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(userProfiles.userId, userId));
}

export async function createPasswordReset(userId: number, token: string, expiresAt: Date) {
  const db = await getDb();
  if (!db) return undefined;
  return await db.insert(passwordResets).values({ userId, token, expiresAt });
}

export async function getPasswordResetByToken(token: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(passwordResets).where(eq(passwordResets.token, token)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function markPasswordResetAsUsed(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  return await db.update(passwordResets).set({ usedAt: new Date() }).where(eq(passwordResets.id, id));
}

export async function getUserConsents(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(userConsents).where(eq(userConsents.userId, userId));
}

export async function upsertUserConsent(userId: number, consentType: string, given: boolean, version: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const existing = await db.select().from(userConsents)
    .where(and(eq(userConsents.userId, userId), eq(userConsents.consentType, consentType as any)))
    .limit(1);
  
  if (existing.length > 0) {
    return await db.update(userConsents)
      .set({ given, version, updatedAt: new Date() })
      .where(eq(userConsents.id, existing[0].id));
  }
  
  return await db.insert(userConsents).values({ userId, consentType: consentType as any, given, version });
}

export async function createSupportTicket(userId: number, subject: string, message: string, channel: string) {
  const db = await getDb();
  if (!db) return undefined;
  return await db.insert(supportTickets).values({ userId, subject, message, channel: channel as any });
}

export async function getUserSupportTickets(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(supportTickets).where(eq(supportTickets.userId, userId));
}

export async function getFaqEntries() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(faqEntries).orderBy(faqEntries.order);
}

export async function createAppRating(userId: number, rating: number, comment?: string) {
  const db = await getDb();
  if (!db) return undefined;
  return await db.insert(appRatings).values({ userId, rating, comment });
}

export async function createDataExportRequest(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  return await db.insert(dataExportRequests).values({ userId, status: 'pending' });
}

export async function getUserDataExportRequests(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(dataExportRequests).where(eq(dataExportRequests.userId, userId));
}

// Simulator functions

export async function getAllCareers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(careers).where(eq(careers.isActive, true)).orderBy(careers.order);
}

export async function getCareerById(careerId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(careers).where(eq(careers.id, careerId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createSimulationSession(userId: number, careerId: number, methodology: "agile" | "waterfall") {
  const db = await getDb();
  if (!db) return undefined;
  return await db.insert(simulationSessions).values({ userId, careerId, methodology });
}

export async function getSimulationSession(sessionId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(simulationSessions).where(eq(simulationSessions.id, sessionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserSimulationSessions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(simulationSessions).where(eq(simulationSessions.userId, userId));
}

export async function updateSimulationSessionStatus(sessionId: number, status: "active" | "paused" | "completed" | "abandoned", score?: number) {
  const db = await getDb();
  if (!db) return undefined;
  const updateData: any = { status, updatedAt: new Date() };
  if (score !== undefined) updateData.score = score;
  if (status === "completed") updateData.completedAt = new Date();
  return await db.update(simulationSessions).set(updateData).where(eq(simulationSessions.id, sessionId));
}

export async function getNpcsByCareer(careerId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(npcs).where(eq(npcs.careerId, careerId));
}

export async function createSimulationTask(sessionId: number, npcId: number, title: string, description: string, methodology: "agile" | "waterfall", difficulty: "easy" | "medium" | "hard", points: number) {
  const db = await getDb();
  if (!db) return undefined;
  return await db.insert(simulationTasks).values({ sessionId, npcId, title, description, methodology, difficulty, points });
}

export async function getSessionTasks(sessionId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(simulationTasks).where(eq(simulationTasks.sessionId, sessionId));
}

export async function updateTaskStatus(taskId: number, status: "pending" | "in_progress" | "completed" | "failed") {
  const db = await getDb();
  if (!db) return undefined;
  const updateData: any = { status };
  if (status === "completed") updateData.completedAt = new Date();
  return await db.update(simulationTasks).set(updateData).where(eq(simulationTasks.id, taskId));
}

export async function getCuriosities(careerId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(curiosities).where(eq(curiosities.careerId, careerId)).orderBy(curiosities.order);
}

export async function createSessionSummary(sessionId: number, totalTasks: number, completedTasks: number, totalPoints: number, earnedPoints: number, topicsLearned: string, feedback?: string) {
  const db = await getDb();
  if (!db) return undefined;
  return await db.insert(sessionSummaries).values({ sessionId, totalTasks, completedTasks, totalPoints, earnedPoints, topicsLearned, feedback });
}

export async function getSessionSummary(sessionId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(sessionSummaries).where(eq(sessionSummaries.sessionId, sessionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
