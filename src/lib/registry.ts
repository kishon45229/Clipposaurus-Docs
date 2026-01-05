import { z } from "zod";
import { DocsComponentSchema, ChangelogComponentSchema } from "@/lib/schema";

export const COMPONENT_SCHEMAS: Record<string, z.ZodSchema> = {
  DocsComponent: DocsComponentSchema,
  ChangelogComponent: ChangelogComponentSchema,
};
