import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    ) // 입력 스키마
    .query((opts) => {
      console.log(opts.ctx.clerkUserId);
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }), // 쿼리 핸들러
});
// export type definition of API
export type AppRouter = typeof appRouter;
