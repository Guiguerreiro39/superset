import { z } from "zod";

export const getAllByDateRangeInputSchema = z.object({
  lte: z.date(),
  gte: z.date(),
});
