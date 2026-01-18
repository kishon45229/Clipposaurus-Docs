import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export const redisClient = redis;

export async function incrementFeedback(
  pageId: string,
  type: "likes" | "dislikes",
): Promise<number> {
  const key = `docs-feedback:${pageId}`;
  return await redisClient.hincrby(key, type, 1);
}

/**
 * Get feedback counts for a page
 * @param pageId - The page identifier
 * @returns Object with likes and dislikes counts
 */
export async function getFeedbackCounts(
  pageId: string,
): Promise<{ likes: number; dislikes: number }> {
  const key = `docs-feedback:${pageId}`;
  const counts = await redisClient.hgetall(key);

  return {
    likes: parseInt(counts?.likes || "0", 10),
    dislikes: parseInt(counts?.dislikes || "0", 10),
  };
}
