"use client"

import { api } from "@/trpc/react";
import PlanItem from "./plan-item";

const PlansList = async () => {
  const plans = api.plan.getAll.useQuery()

  if (plans.isLoading) return <PlansListSkeleton />

  if (plans.data?.length === 0) {
    return (
      <p className="w-full py-8 text-center font-semibold text-slate-500">
        There are no plans to show
      </p>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-2">
      {plans.data?.map((plan) => (
        <PlanItem plan={plan} key={plan.id} />
      ))}
    </ul>
  );
};

export const PlansListSkeleton = () => (
  <ul className="flex w-full flex-col gap-2">
    <PlanItem.Skeleton />
    <PlanItem.Skeleton />
  </ul>
)

export default PlansList;
