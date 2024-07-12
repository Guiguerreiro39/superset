"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ExercisesList from "./exercises-list";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { NewPlanContext } from "../new-plan-form";

type CreateExerciseFormProps = {
  onSuccess: () => void
}

export const createExerciseFormSchema = z.object({
  query: z.string(),
  exercises: z.array(z.object({
    value: z.number(),
    name: z.string()
  }))
});

const CreateExerciseForm = ({ onSuccess }: CreateExerciseFormProps) => {
  const newPlanContext = useContext(NewPlanContext)

  const form = useForm<z.infer<typeof createExerciseFormSchema>>({
    resolver: zodResolver(createExerciseFormSchema),
    defaultValues: {
      query: "",
      exercises: []
    },
  });
  const exercises = form.watch("exercises")

  const debounceQuery = useDebounce(form.watch("query"), 300)

  const onSubmit = async (input: z.infer<typeof createExerciseFormSchema>) => {
    const payload = input.exercises.map((exercise) => ({
      sets: [],
      exercise: {
        id: exercise.value,
        name: exercise.name
      }
    }))
    newPlanContext?.setValue("baseWorkout.customExercises", [...newPlanContext.getValues("baseWorkout.customExercises"), ...payload])
    onSuccess()
  };

  return (<Form {...form}>
    <form
      className="flex-1 flex flex-col justify-between space-y-4"
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search for an exercise" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <ExercisesList query={debounceQuery} control={form.control} />
      </div>
      {
        exercises.length !== 0 &&
        <Button type="submit" onClick={(e) => {
          e.preventDefault()
          form.handleSubmit(onSubmit)()
        }}>Add {exercises.length}</Button>
      }
    </form>
  </Form>)
}

export default CreateExerciseForm;