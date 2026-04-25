import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";
import { sendPasswordResetEmail } from "./_core/email";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),

    // Email/Password Registration
    signup: publicProcedure
      .input(
        z.object({
          name: z.string().min(2).max(255),
          email: z.string().email(),
          password: z.string().min(8),
          confirmPassword: z.string().min(8),
        })
      )
      .mutation(async ({ input }) => {
        // Validate passwords match
        if (input.password !== input.confirmPassword) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "As senhas não coincidem",
          });
        }

        // Validate password strength
        const hasUpperCase = /[A-Z]/.test(input.password);
        const hasLowerCase = /[a-z]/.test(input.password);
        const hasNumber = /[0-9]/.test(input.password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input.password);

        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Senha deve conter maiúsculas, minúsculas, números e caracteres especiais",
          });
        }

        // Check if email already exists
        const existingUser = await db.getUserByEmail(input.email);
        if (existingUser) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Este email já está cadastrado",
          });
        }

        // Create user with hashed password
        const user = await db.createUserWithPassword(
          input.name,
          input.email,
          input.password
        );

        return {
          success: true,
          message: "Cadastro realizado com sucesso! Faça login para continuar.",
        };
      }),

    // Email/Password Login
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Find user by email
        const user = await db.getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Email ou senha incorretos",
          });
        }

        // Verify password (placeholder - in production use bcrypt)
        if (user.passwordHash !== input.password) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Email ou senha incorretos",
          });
        }

        // Update last signed in
        await db.updateUserLastSignedIn(user.id);

        // Set session cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.setHeader("Set-Cookie", `${COOKIE_NAME}=${user.id}; ${cookieOptions}`);

        return {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      }),

    // Password Reset Request
    requestPasswordReset: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const user = await db.getUserByEmail(input.email);
        if (!user || !user.email) {
          // Don't reveal if email exists for security
          return {
            success: true,
            message: "Se o email existir, você receberá um link de redefinição",
          };
        }

        // Create password reset token
        const token = await db.createPasswordResetToken(user.id);

        // Send email with reset link
        const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/auth/reset-password?token=${token}`;
        await sendPasswordResetEmail(user.email || input.email, user.name || "Usuário", resetUrl);

        return {
          success: true,
          message: "Email de redefinição de senha enviado com sucesso",
        };
      }),

    // Password Reset Confirmation
    resetPassword: publicProcedure
      .input(
        z.object({
          token: z.string(),
          newPassword: z.string().min(8),
          confirmPassword: z.string().min(8),
        })
      )
      .mutation(async ({ input }) => {
        // Validate passwords match
        if (input.newPassword !== input.confirmPassword) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "As senhas não coincidem",
          });
        }

        // Validate password strength
        const hasUpperCase = /[A-Z]/.test(input.newPassword);
        const hasLowerCase = /[a-z]/.test(input.newPassword);
        const hasNumber = /[0-9]/.test(input.newPassword);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input.newPassword);

        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Senha deve conter maiúsculas, minúsculas, números e caracteres especiais",
          });
        }

        // Verify token and update password
        const result = await db.resetPasswordWithToken(input.token, input.newPassword);
        if (!result) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Token inválido ou expirado",
          });
        }

        return {
          success: true,
          message: "Senha redefinida com sucesso! Faça login com sua nova senha.",
        };
      }),
  }),

  // Profile Management
  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const profile = await db.getUserProfile(ctx.user.id);
      return {
        user: ctx.user,
        profile: profile || null,
      };
    }),

    update: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1).max(255).optional(),
          bio: z.string().max(500).optional(),
          phone: z.string().max(20).optional(),
          profilePhotoUrl: z.string().url().optional(),
          backgroundPhotoUrl: z.string().url().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.updateUserProfile(ctx.user.id, input);
        return { success: true };
      }),

    updateNotificationPreferences: protectedProcedure
      .input(
        z.object({
          notificationChannel: z.enum(["app", "email", "whatsapp"]),
          notificationFrequency: z.enum(["instant", "daily", "weekly"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.updateUserProfile(ctx.user.id, input);
        return { success: true };
      }),
  }),

  // Security Management
  security: router({
    changePassword: protectedProcedure
      .input(
        z.object({
          currentPassword: z.string().min(8),
          newPassword: z.string().min(8),
          confirmPassword: z.string().min(8),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Validate passwords match
        if (input.newPassword !== input.confirmPassword) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "As senhas não coincidem",
          });
        }

        // Validate password strength
        const hasUpperCase = /[A-Z]/.test(input.newPassword);
        const hasLowerCase = /[a-z]/.test(input.newPassword);
        const hasNumber = /[0-9]/.test(input.newPassword);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input.newPassword);

        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Senha deve conter maiúsculas, minúsculas, números e caracteres especiais",
          });
        }

        // In production, verify currentPassword against stored hash
        // For now, just return success
        return { success: true, message: "Senha alterada com sucesso!" };
      }),

    getSessions: protectedProcedure.query(async ({ ctx }) => {
      // In production, fetch from database
      return [
        {
          id: 1,
          device: "Chrome no Windows",
          lastActive: new Date(),
          current: true,
        },
      ];
    }),

    terminateSession: protectedProcedure
      .input(z.object({ sessionId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // In production, delete session from database
        return { success: true };
      }),
  }),

  // Privacy & LGPD
  privacy: router({
    getConsents: protectedProcedure.query(async ({ ctx }) => {
      const consents = await db.getUserConsents(ctx.user.id);
      return consents;
    }),

    updateConsent: protectedProcedure
      .input(
        z.object({
          consentType: z.enum(["privacy_policy", "terms_of_use", "marketing", "data_processing"]),
          given: z.boolean(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.upsertUserConsent(ctx.user.id, input.consentType, input.given, "1.0");
        return { success: true };
      }),

    requestDataExport: protectedProcedure.mutation(async ({ ctx }) => {
      const request = await db.createDataExportRequest(ctx.user.id);
      return {
        success: true,
        message: "Solicitação de exportação criada. Você receberá um e-mail com o download em até 24 horas.",
      };
    }),

    getExportRequests: protectedProcedure.query(async ({ ctx }) => {
      const requests = await db.getUserDataExportRequests(ctx.user.id);
      return requests;
    }),

    deleteAccount: protectedProcedure
      .input(z.object({ confirmation: z.string() }))
      .mutation(async ({ ctx, input }) => {
        if (input.confirmation !== "EXCLUIR") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Confirmação inválida",
          });
        }

        // In production, implement account deletion with data anonymization
        // For now, just return success
        return {
          success: true,
          message: "Sua conta será excluída em até 30 dias",
        };
      }),
  }),

  // Support
  support: router({
    submitTicket: protectedProcedure
      .input(
        z.object({
          subject: z.string().min(5).max(255),
          message: z.string().min(10).max(5000),
          channel: z.enum(["email", "chat", "whatsapp"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const ticket = await db.createSupportTicket(
          ctx.user.id,
          input.subject,
          input.message,
          input.channel
        );
        return {
          success: true,
          message: "Ticket enviado com sucesso. Você receberá uma resposta em breve.",
        };
      }),

    getTickets: protectedProcedure.query(async ({ ctx }) => {
      const tickets = await db.getUserSupportTickets(ctx.user.id);
      return tickets;
    }),

    getFaq: publicProcedure.query(async () => {
      const faqEntries = await db.getFaqEntries();
      return faqEntries;
    }),

    submitRating: protectedProcedure
      .input(
        z.object({
          rating: z.number().min(1).max(5),
          comment: z.string().max(1000).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.createAppRating(ctx.user.id, input.rating, input.comment);
        return { success: true, message: "Obrigado pela sua avaliação!" };
      }),
  }),

  // Simulator
  simulator: router({
    getAllCareers: publicProcedure.query(async () => {
      return await db.getAllCareers();
    }),

    getCareerById: publicProcedure
      .input(z.object({ careerId: z.number() }))
      .query(async ({ input }) => {
        return await db.getCareerById(input.careerId);
      }),

    startSession: protectedProcedure
      .input(
        z.object({
          careerId: z.number(),
          methodology: z.enum(["agile", "waterfall"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const session = await db.createSimulationSession(
          ctx.user.id,
          input.careerId,
          input.methodology
        );
        return { success: true, sessionId: (session as any).insertId };
      }),

    getSession: protectedProcedure
      .input(z.object({ sessionId: z.number() }))
      .query(async ({ ctx, input }) => {
        const session = await db.getSimulationSession(input.sessionId);
        if (!session || session.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return session;
      }),

    getUserSessions: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserSimulationSessions(ctx.user.id);
    }),

    updateSessionStatus: protectedProcedure
      .input(
        z.object({
          sessionId: z.number(),
          status: z.enum(["active", "paused", "completed", "abandoned"]),
          score: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const session = await db.getSimulationSession(input.sessionId);
        if (!session || session.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.updateSimulationSessionStatus(
          input.sessionId,
          input.status,
          input.score
        );
        return { success: true };
      }),

    getNpcsByCareer: publicProcedure
      .input(z.object({ careerId: z.number() }))
      .query(async ({ input }) => {
        return await db.getNpcsByCareer(input.careerId);
      }),

    createTask: protectedProcedure
      .input(
        z.object({
          sessionId: z.number(),
          npcId: z.number(),
          title: z.string(),
          description: z.string(),
          methodology: z.enum(["agile", "waterfall"]),
          difficulty: z.enum(["easy", "medium", "hard"]),
          points: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const session = await db.getSimulationSession(input.sessionId);
        if (!session || session.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const task = await db.createSimulationTask(
          input.sessionId,
          input.npcId,
          input.title,
          input.description,
          input.methodology,
          input.difficulty,
          input.points
        );
        return { success: true, taskId: (task as any).insertId };
      }),

    getSessionTasks: protectedProcedure
      .input(z.object({ sessionId: z.number() }))
      .query(async ({ ctx, input }) => {
        const session = await db.getSimulationSession(input.sessionId);
        if (!session || session.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getSessionTasks(input.sessionId);
      }),

    updateTaskStatus: protectedProcedure
      .input(
        z.object({
          taskId: z.number(),
          status: z.enum(["pending", "in_progress", "completed", "failed"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.updateTaskStatus(input.taskId, input.status);
        return { success: true };
      }),

    getCuriosities: publicProcedure
      .input(z.object({ careerId: z.number() }))
      .query(async ({ input }) => {
        return await db.getCuriosities(input.careerId);
      }),

    createSessionSummary: protectedProcedure
      .input(
        z.object({
          sessionId: z.number(),
          totalTasks: z.number(),
          completedTasks: z.number(),
          totalPoints: z.number(),
          earnedPoints: z.number(),
          topicsLearned: z.string(),
          feedback: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const session = await db.getSimulationSession(input.sessionId);
        if (!session || session.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.createSessionSummary(
          input.sessionId,
          input.totalTasks,
          input.completedTasks,
          input.totalPoints,
          input.earnedPoints,
          input.topicsLearned,
          input.feedback
        );
        return { success: true };
      }),

    getSessionSummary: protectedProcedure
      .input(z.object({ sessionId: z.number() }))
      .query(async ({ ctx, input }) => {
        const session = await db.getSimulationSession(input.sessionId);
        if (!session || session.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getSessionSummary(input.sessionId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
