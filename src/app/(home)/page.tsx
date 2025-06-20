import PageClient from "@/app/(home)/client";
import { trpc } from "@/trpc/server";

export default async function Home() {
  void trpc.hello.prefetch({ text: "Antonio" });

  return (
    <div>
      <PageClient />
    </div>
  );
}
