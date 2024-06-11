import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must not be empty.",
  }),
});

type NewPlanFormProps = {
  onSuccess?: () => void;
}

const NewPlanForm = ({ onSuccess }: NewPlanFormProps) => {
  const utils = api.useUtils();
  const createPlan = api.plan.create.useMutation({
    onSuccess: async () => {
      await utils.plan.getAll.invalidate();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (input: z.infer<typeof formSchema>) => {
    createPlan.mutate(input);
    onSuccess?.()
  };

  return (<Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 px-4 pb-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Plan name</FormLabel>
            <FormControl>
              <Input placeholder="My awesome plan" {...field} />
            </FormControl>
            <FormDescription>
              This is the name of your plan.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />
      <Button type="submit" className="w-full">
        Create
      </Button>
    </form>
  </Form>);
}

export default NewPlanForm;