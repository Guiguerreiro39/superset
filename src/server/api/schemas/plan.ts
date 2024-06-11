import { z } from "zod";

export const createInputSchema = z.object({
  name: z.string().min(1),
});
