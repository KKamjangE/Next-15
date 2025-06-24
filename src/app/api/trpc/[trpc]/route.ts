import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc", // TRPC 엔드포인트
    req,
    router: appRouter, // 클라이언트 요청을 TRPC 라우터로 넘김
    createContext: createTRPCContext,
  });
export { handler as GET, handler as POST };
