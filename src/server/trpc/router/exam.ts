import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const examRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        questions: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const questions = input.questions.map((q) => {
        return { id: q };
      });
      await ctx.prisma.exam.create({
        data: {
          title: input.title,
          user_id: ctx.session.user.id,
          questions: {
            connect: questions,
          },
        },
      });
    }),
  getExams: protectedProcedure
    .input(z.object({ take: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.exam.findMany({
        where: { user_id: ctx.session.user.id },
        include: { _count: { select: { questions: true } } },
        take: input.take,
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.exam.findUnique({
        where: { id: input.id },
        include: {
          questions: { include: { answers: true } },
        },
      });
    }),
});
