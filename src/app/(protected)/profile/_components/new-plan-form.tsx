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
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SheetFooter } from "@/components/ui/sheet";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must not be empty.",
  }),
  description: z.string().optional()
});

type NewPlanFormProps = {
  onSuccess?: () => void;
}

const NewPlanForm = ({ onSuccess }: NewPlanFormProps) => {
  const { toast } = useToast()
  const utils = api.useUtils();

  const createPlan = api.plan.create.useMutation({
    onSuccess: () => {
      onSuccess?.()
      toast({
        title: "A new Plan has been created!"
      })
    },
    onSettled: () => {
      utils.plan.getAll.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Something wrong happened...",
        description: `An error occured when trying to create your plan: ${error.message}`
      })
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: ""
    },
  });

  const onSubmit = async (input: z.infer<typeof formSchema>) => {
    createPlan.mutate(input);
  };

  return (<Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex-1 flex flex-col justify-between"
    >
      <div className="space-y-4 mb-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Plan name</FormLabel>
                <FormDescription>
                  This is the name of your plan.
                </FormDescription>
              </div>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Plan description</FormLabel>
                <FormDescription>
                  Give a quick introduction for this plan.
                </FormDescription>
              </div>
              <FormControl>
                <Textarea placeholder="Description" minLength={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button type="submit" className="w-full" isLoading={createPlan.isPending}>
        Create
      </Button>
    </form>
  </Form>);
}

export default NewPlanForm;