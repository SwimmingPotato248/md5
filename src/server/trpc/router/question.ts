import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
export const questionRouter = router({
  getCategory: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),
  getQuestions: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.question.findMany({
      where: {
        user_id: ctx.session.user.id,
      },
      include: { category: true },
    });
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
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.question.delete({
          where: {
            id: input.id,
          },
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.log(e);

          if (e.code === "P2001")
            throw new TRPCError({ code: "BAD_REQUEST", message: "" });
        }
      }
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.question.findUnique({
        where: {
          id: input.id,
        },
        include: {
          category: true,
          answers: true,
          _count: { select: { exams: true } },
        },
      });
    }),
  editQuestion: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.question.update({
        where: { id: input.id },
        data: { content: input.content },
      });
    }),
});
