import { z } from "zod";

export const collectionSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(""),
});