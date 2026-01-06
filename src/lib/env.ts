import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),

  NEXT_PUBLIC_CLIPPOSAURUS_CONTACT_EMAIL:z.email(),

  NEXT_PUBLIC_DEVELOPMENT_APP_URL: z.url(),
  NEXT_PUBLIC_PRODUCTION_APP_URL: z.url(),

  NEXT_PUBLIC_DEVELOPMENT_MARKETING_URL: z.url(),
  NEXT_PUBLIC_PRODUCTION_MARKETING_URL: z.url(),

  NEXT_PUBLIC_GITHUB_REPO_URL: z.url(),
  NEXT_PUBLIC_GITHUB_SPONSOR_URL: z.url(),
  NEXT_PUBLIC_GITHUB_ISSUES_URL: z.url(),
  NEXT_PUBLIC_GITHUB_STARS_API_URL: z.url(),

  UPSTASH_REDIS_REST_URL: z.url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables:", _env.error);
  throw new Error("Invalid environment variables");
}

const env = _env.data;
export default env;
