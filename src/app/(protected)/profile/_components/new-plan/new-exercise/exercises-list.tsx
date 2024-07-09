"use client"

import Loading from "@/components/loading";
import { api } from "@/trpc/react";
import NewExerciseDrawer from "./new-exercise-drawer";
import { Badge } from "@/components/ui/badge";
import { Control, useFieldArray } from "react-hook-form";
import { createExerciseFormSchema } from "./create-exercise-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

type ExercisesListProps = {
  query: string
  control: Control<z.infer<typeof createExerciseFormSchema>>
}

const ExercisesList = ({ query, control }: ExercisesListProps) => {
  const exercises = api.exercise.getAllByQuery.useQuery({ query })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises"
  });

  if (exercises.isLoading) {
    return <div className="flex justify-center py-4 w-full">
      <Loading />
    </div>
  }

  if (!query && exercises.data?.length === 0) {
    return <div className="py-4 space-y-4">
      <p className="w-full text-center font-semibold text-slate-500">
        You haven't created an exercise yet.
      </p>
      <NewExerciseDrawer name={query} />
    </div>
  }

  if (query && exercises.data?.length === 0) {
    return <div className="py-4 space-y-4">
      <p className="w-full text-center font-semibold text-slate-500">
        There is no exercise that contains "{query}".
      </p>
      <NewExerciseDrawer name={query} />
    </div>
  }

  if (exercises.data?.length === 0) {
    return <p className="w-full py-8 text-center font-semibold text-slate-500">
      There are no exercises to show
    </p>
  }

  return (<div className="space-y-2">
    {
      exercises.data?.map(exercise => {
        const currentIndex = fields.map(field => field.value).indexOf(exercise.id)
        const isChecked = currentIndex !== -1
        const onClick = isChecked ? () => remove(currentIndex) : () => append({ value: exercise.id })

        return (
          <button key={exercise.id} type="button" onClick={onClick} className={cn("w-full border rounded border-slate-200 p-2 flex items-center justify-between gap-4", {
            "border-lime-600 border-2": isChecked
          })}>
            <div className="space-y-2">
              <p className="text-left">{exercise.name}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  Chest
                </Badge>
                <Badge variant="secondary">
                  Shoulders
                </Badge>
              </div>
            </div>
            {
              isChecked &&
              <Checkbox checked={true} className="rounded-full w-6 h-6" />
            }
          </button>
        )
      })
    }
  </div>);
}


export default ExercisesList;