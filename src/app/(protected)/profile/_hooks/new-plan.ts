import { api } from "@/trpc/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must not be empty.",
  }),
});

const useNewPlan = () => {
  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  return {
    open,
    setOpen,
    form,
    onSubmit,
  };
};

export default useNewPlan;
