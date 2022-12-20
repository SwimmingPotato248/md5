import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import bcrypt from 'bcrypt';

export const userRouter = router({
    hello: publicProcedure
        .input(z.object({ text: z.string().nullish() }).nullish())
        .query(({ input }) => {
            return {
                greeting: `Hello ${input?.text ?? "world"}`,
            };
        }),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany();
    }),
    findById: publicProcedure.query(({ ctx, input }) => {
        return ctx.prisma.user.findFirst({ where: { id: input.id } });
    }),
    register: publicProcedure
    .input(z.object({
        username: z.string(), password: z.string(), display_name: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        console.log(input);

        let account = {
            username: input.username,
            password: await bcrypt.hash(input.password, 10),
            display_name: input.display_name,
            role: 'User'
        }
        return await ctx.prisma.user.create({data: account});
    })
});
