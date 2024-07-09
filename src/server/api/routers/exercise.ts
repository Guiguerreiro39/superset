import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

const getAllByQueryInputSchema = z.object({
  query: z.string(),
});

const createInputSchema = z.object({
  name: z.string().min(1),
});

export const ExerciseRouter = createTRPCRouter({
  getAllByQuery: publicProcedure
    .input(getAllByQueryInputSchema)
    .query(({ ctx, input }) => {
      return ctx.db.exercise.findMany({
        where: {
          name: {
            contains: input.query,
          },
        },
      });
    }),
  create: protectedProcedure
    .input(createInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.exercise.create({
        data: {
          name: input.name,
        },
      });
    }),
});
