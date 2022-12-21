import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
export const questionRouter = router({
  getCategory: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        questionContent: z.string(),
        category: z.string(),
        answers: z.array(
          z.object({
            id: z.string(),
            content: z.string(),
            status: z.boolean(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.create({
        data: {
          content: input.questionContent,
          user_id: ctx.session.user.id,
          category_id: input.category,
        },
      });
      const answers = input.answers.map((answer) => {
        return {
          content: answer.content,
          status: answer.status,
          question_id: question.id,
        };
      });
      await ctx.prisma.answer.createMany({ data: answers });
    }),
});
