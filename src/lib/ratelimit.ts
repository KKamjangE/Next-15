import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "10s"), // 10초 이내 100개의 요청이 발생하면 타임아웃
});
