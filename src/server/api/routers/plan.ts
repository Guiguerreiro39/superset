import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { planInputSchema } from "../schemas/plan";

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
        exercises: {
          select: {
            id: true,
          },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(planInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.plan.create({
        data: {
          name: input.name,
        },
      });
    }),
});