import { z } from "zod";

export const resourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1, "URL is required"),
  type: z.enum(["Link", "PDF", "Video"]),
  collectionId: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  quickNote: z.string().default("")
});