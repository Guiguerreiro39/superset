import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createInputSchema } from "../schemas/plan";

export const planRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.plan.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        workouts: {
          select: {
            id: true,
          },
        },
        baseWorkout: {
          select: {
            id: true,
            customExercises: true,
          },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(createInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.plan.create({
        data: {
          name: input.name,
          description: input.description || "",
          baseWorkoutId: input.baseWorkoutId,
        },
      });
    }),
});
