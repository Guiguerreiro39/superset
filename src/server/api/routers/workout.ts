import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getAllByDateRangeInputSchema } from "../schemas/workout";

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
