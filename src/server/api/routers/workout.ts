import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

const getAllByDateRangeInputSchema = z.object({
  lte: z.date(),
  gte: z.date(),
});

export const workoutRouter = createTRPCRouter({
  getAllByDateRange: publicProcedure
    .input(getAllByDateRangeInputSchema)
    .query(({ ctx, input }) => {
      return ctx.db.workout.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          createdAt: {
            lte: input.lte,
            gte: input.gte,
          },
        },
        select: {
          id: true,
          createdAt: true,
          plan: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
});
