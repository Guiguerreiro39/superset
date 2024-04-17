"use client";

import { api } from "@/trpc/react";
import { Badge } from "@/components/ui/badge";
import { LandPlot } from "lucide-react";

const WorkoutList = () => {
  const plans = api.plan.getAll.useQuery();

  const isEmpty = plans.isSuccess && plans.data.length === 0;

  if (plans.isLoading) {
    return (
      <p className="w-full py-8 text-center font-semibold text-slate-500">
        Loading...
      </p>
    );
  }

  if (isEmpty) {
    return (
      <p className="w-full py-8 text-center font-semibold text-slate-500">
        There are no plans to show
      </p>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-2">
      {plans.data?.map((plan) => (
        <li
          key={plan.id}
          style={{
            backgroundImage:
              "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('/assets/images/gym.jpeg')",
          }}
          className="flex min-h-[10rem] w-full flex-col justify-between rounded-md bg-neutral-500 bg-cover p-4 text-white shadow-inner"
        >
          <div className="flex items-center gap-1">
            <Badge className="bg-white/50 text-white backdrop-blur-sm">
              Tag 1
            </Badge>
            <Badge className="bg-white/50 text-white backdrop-blur-sm">
              Tag 2
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="truncate text-lg font-semibold">{plan.name}</h2>
            <div className="flex items-center gap-1 text-sm">
              <LandPlot className="h-4 w-4" />
              <span>{plan.exercises.length} Exercises</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WorkoutList;
