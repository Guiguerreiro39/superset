import { type Plan } from "@prisma/client";

export const isPlansNotEmpty = (_: unknown, params: { plans: Plan[] }) =>
  params.plans.length > 0;
