import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type NewExerciseProps = {
  name: string
  onSuccess: () => void
}

const NewExerciseFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must not be empty.",
  }),
});

const NewExerciseForm = ({ name, onSuccess }: NewExerciseProps) => {
  const utils = api.useUtils()
  const createExercise = api.exercise.create.useMutation({
    onSuccess: () => {
      utils.exercise.getAllByQuery.invalidate()
      onSuccess()
    }
  })

  const form = useForm<z.infer<typeof NewExerciseFormSchema>>({
    resolver: zodResolver(NewExerciseFormSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (input: z.infer<typeof NewExerciseFormSchema>) => {
    createExercise.mutate(input)
  };

  return (<Form {...form}>
    <form
      className="flex-1 flex flex-col justify-between space-y-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>Exercise name</FormLabel>
              <FormDescription>
                This is the name of your new exercise.
              </FormDescription>
            </div>
            <FormControl>
              <Input placeholder="Exercise name..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button isLoading={createExercise.isPending} type="submit" onClick={(e) => {
        e.preventDefault()
        form.handleSubmit(onSubmit)()
      }}>
        Create exercise
      </Button>
    </form></Form>);
}

export default NewExerciseForm;