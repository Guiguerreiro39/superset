import { z } from "zod";

export const planInputSchema = z.object({
  name: z.string().min(1),
});
