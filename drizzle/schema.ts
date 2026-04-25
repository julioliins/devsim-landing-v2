import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, longtext, decimal } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  passwordHash: text("passwordHash"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User profile information - extended profile data
 */
export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  profilePhotoUrl: text("profilePhotoUrl"),
  backgroundPhotoUrl: text("backgroundPhotoUrl"),
  bio: text("bio"),
  phone: varchar("phone", { length: 20 }),
  notificationChannel: mysqlEnum("notificationChannel", ["app", "email", "whatsapp"]).default("email"),
  notificationFrequency: mysqlEnum("notificationFrequency", ["instant", "daily", "weekly"]).default("daily"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

/**
 * User sessions - track active sessions
 */
export const userSessions = mysqlTable("user_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().unique(),
  userAgent: text("userAgent"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  lastActivityAt: timestamp("lastActivityAt").defaultNow().onUpdateNow().notNull(),
});

export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;

/**
 * Password reset tokens
 */
export const passwordResets = mysqlTable("password_resets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  usedAt: timestamp("usedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PasswordReset = typeof passwordResets.$inferSelect;
export type InsertPasswordReset = typeof passwordResets.$inferInsert;

/**
 * User consent tracking for LGPD compliance
 */
export const userConsents = mysqlTable("user_consents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  consentType: mysqlEnum("consentType", ["privacy_policy", "terms_of_use", "marketing", "data_processing"]).notNull(),
  given: boolean("given").notNull(),
  version: varchar("version", { length: 20 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserConsent = typeof userConsents.$inferSelect;
export type InsertUserConsent = typeof userConsents.$inferInsert;

/**
 * User data export requests for LGPD
 */
export const dataExportRequests = mysqlTable("data_export_requests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  status: mysqlEnum("status", ["pending", "processing", "ready", "expired", "failed"]).default("pending"),
  downloadUrl: text("downloadUrl"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type DataExportRequest = typeof dataExportRequests.$inferSelect;
export type InsertDataExportRequest = typeof dataExportRequests.$inferInsert;

/**
 * Support tickets
 */
export const supportTickets = mysqlTable("support_tickets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: longtext("message").notNull(),
  channel: mysqlEnum("channel", ["email", "chat", "whatsapp"]).default("email"),
  status: mysqlEnum("status", ["open", "in_progress", "resolved", "closed"]).default("open"),
  rating: int("rating"),
  feedback: text("feedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;

/**
 * FAQ entries
 */
export const faqEntries = mysqlTable("faq_entries", {
  id: int("id").autoincrement().primaryKey(),
  question: varchar("question", { length: 500 }).notNull(),
  answer: longtext("answer").notNull(),
  category: varchar("category", { length: 100 }),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FaqEntry = typeof faqEntries.$inferSelect;
export type InsertFaqEntry = typeof faqEntries.$inferInsert;

/**
 * User app ratings
 */
export const appRatings = mysqlTable("app_ratings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  rating: int("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AppRating = typeof appRatings.$inferSelect;
export type InsertAppRating = typeof appRatings.$inferInsert;

/**
 * Careers available in the simulator
 */
export const careers = mysqlTable("careers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 255 }),
  color: varchar("color", { length: 20 }),
  order: int("order").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Career = typeof careers.$inferSelect;
export type InsertCareer = typeof careers.$inferInsert;

/**
 * Simulation sessions - track user simulations
 */
export const simulationSessions = mysqlTable("simulation_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  careerId: int("careerId").notNull(),
  methodology: mysqlEnum("methodology", ["agile", "waterfall"]).notNull(),
  status: mysqlEnum("status", ["active", "paused", "completed", "abandoned"]).default("active"),
  score: int("score"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SimulationSession = typeof simulationSessions.$inferSelect;
export type InsertSimulationSession = typeof simulationSessions.$inferInsert;

/**
 * NPCs (Non-Player Characters) - fictional figures in simulations
 */
export const npcs = mysqlTable("npcs", {
  id: int("id").autoincrement().primaryKey(),
  careerId: int("careerId").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  avatar: varchar("avatar", { length: 255 }),
  personality: text("personality"),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Npc = typeof npcs.$inferSelect;
export type InsertNpc = typeof npcs.$inferInsert;

/**
 * Tasks assigned during simulations
 */
export const simulationTasks = mysqlTable("simulation_tasks", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  npcId: int("npcId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: longtext("description"),
  methodology: mysqlEnum("methodology", ["agile", "waterfall"]).notNull(),
  status: mysqlEnum("status", ["pending", "in_progress", "completed", "failed"]).default("pending"),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("medium"),
  points: int("points").default(0),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SimulationTask = typeof simulationTasks.$inferSelect;
export type InsertSimulationTask = typeof simulationTasks.$inferInsert;

/**
 * Curiosities/Fun facts about careers
 */
export const curiosities = mysqlTable("curiosities", {
  id: int("id").autoincrement().primaryKey(),
  careerId: int("careerId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  category: varchar("category", { length: 100 }),
  icon: varchar("icon", { length: 255 }),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Curiosity = typeof curiosities.$inferSelect;
export type InsertCuriosity = typeof curiosities.$inferInsert;

/**
 * Session summaries - what was covered in each simulation
 */
export const sessionSummaries = mysqlTable("session_summaries", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull().unique(),
  totalTasks: int("totalTasks").default(0),
  completedTasks: int("completedTasks").default(0),
  totalPoints: int("totalPoints").default(0),
  earnedPoints: int("earnedPoints").default(0),
  topicsLearned: longtext("topicsLearned"),
  feedback: text("feedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SessionSummary = typeof sessionSummaries.$inferSelect;
export type InsertSessionSummary = typeof sessionSummaries.$inferInsert;

/**
 * Relations
 */
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  sessions: many(userSessions),
  passwordResets: many(passwordResets),
  consents: many(userConsents),
  supportTickets: many(supportTickets),
  appRatings: many(appRatings),
}));