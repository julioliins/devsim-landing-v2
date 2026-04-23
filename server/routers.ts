import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
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
        return { success: true };
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
});

export type AppRouter = typeof appRouter;
