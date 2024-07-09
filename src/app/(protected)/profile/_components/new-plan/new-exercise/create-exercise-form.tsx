"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ExercisesList from "./exercises-list";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { Separator } from "@/components/ui/separator";

export const createExerciseFormSchema = z.object({
  query: z.string().min(1, {
    message: "Name must not be empty.",
  }),
  exercises: z.array(z.object({
    value: z.number()
  }))
});

const CreateExerciseForm = () => {
  const form = useForm<z.infer<typeof createExerciseFormSchema>>({
    resolver: zodResolver(createExerciseFormSchema),
    defaultValues: {
      query: "",
    },
  });

  const debounceQuery = useDebounce(form.watch("query"), 300)

  const onSubmit = async (input: z.infer<typeof createExerciseFormSchema>) => {

  };

  return (<Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex-1 flex flex-col justify-between space-y-4"
    >
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
    </form>
  </Form>)
}

export default CreateExerciseForm;