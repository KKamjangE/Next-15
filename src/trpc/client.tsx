"use client";
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "./routers/_app";
import superjson from "superjson";
export const trpc = createTRPCReact<AppRouter>(); // trpc react 클라이언트 생성

// Query Client 싱글톤 패턴
let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: 항상 새로운 쿼리 클라이언트 생성
    return makeQueryClient();
  }
  // Browser: 싱글톤 패턴으로 동일한 쿼리 클라이언트 유지
  return (clientQueryClientSingleton ??= makeQueryClient());
}

// URL을 동적으로 생성하는 함수
function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return ""; // 브라우저 환경
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // vercel 환경
    return "http://localhost:3000"; // 개발 환경
  })();
  return `${base}/api/trpc`;
}

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
