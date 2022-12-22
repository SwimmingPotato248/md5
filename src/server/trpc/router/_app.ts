import { router } from "../trpc";
import { authRouter } from "./auth";
import { examRouter } from "./exam";
import { exampleRouter } from "./example";
import { questionRouter } from "./question";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  question: questionRouter,
  exam: examRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
