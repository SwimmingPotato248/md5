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
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exam.findMany({
      where: { user_id: ctx.session.user.id },
    });
  }),
});
