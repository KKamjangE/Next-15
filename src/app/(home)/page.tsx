import PageClient from "@/app/(home)/client";
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {
  void trpc.hello.prefetch({ text: "Antonio" });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <PageClient />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
