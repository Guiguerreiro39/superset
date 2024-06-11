"use client"

import { cn } from "@/lib/utils";
import { isPast } from "date-fns";
import { Check, X } from "lucide-react";

type HistoryItemProps = {
  date: Date,
  isWorkoutComplete: boolean
}

const HistoryItem = ({ date, isWorkoutComplete }: HistoryItemProps) => {
  const isPastDate = isPast(date)

  return <div className={cn("bg-slate-200 w-6 h-6 rounded relative shadow mx-auto", {
    "bg-slate-300": isPastDate,
    "bg-lime-300": isWorkoutComplete
  })}>
    {
      isWorkoutComplete &&
      <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-lime-600 stroke-2" />
    }
    {
      isPastDate && !isWorkoutComplete &&
      <X className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 stroke-2" />
    }
  </div>;
}

export default HistoryItem;