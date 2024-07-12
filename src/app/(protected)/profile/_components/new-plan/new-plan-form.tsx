"use client"

import {
  Form
} from "@/components/ui/form";
import { api } from "@/trpc/react";
import { UseFormGetValues, UseFormSetValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PlanInformation from "./plan-information";
import BaseWorkoutSetup from "./base-workout-setup";
import { createContext } from "react";

export const newPlanformSchema = z.object({
  name: z.string().min(1, {
    message: "Name must not be empty.",
  }),
  description: z.string().optional(),
  baseWorkout: z.object({
    customExercises: z.object({
      sets: z.object({
        reps: z.number().min(1, {
          message: "A set must have one rep or more."
        }),
        kg: z.number().optional()
      }).array().min(1, {
        message: "An exercise must have at least one set."
      }),
      exercise: z.object({
        name: z.string(),
        id: z.number({
          required_error: "You must add a valid exercise"
        })
      })
    }).array()
  })
});

type NewPlanFormProps = {
  onClose: () => void;
  onNext: () => void
  onPrevious: () => void
  step: number
  isReadyToSubmit: boolean
}

type NewPlanContextType = {
  setValue: UseFormSetValue<z.infer<typeof newPlanformSchema>>
  getValues: UseFormGetValues<z.infer<typeof newPlanformSchema>>
} | null

export const NewPlanContext = createContext<NewPlanContextType>(null)

const NewPlanForm = ({ onClose, onNext, onPrevious, step, isReadyToSubmit }: NewPlanFormProps) => {
  const { toast } = useToast()
  const utils = api.useUtils();

  const createPlan = api.plan.create.useMutation({
    onSuccess: () => {
      onClose?.()
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

  const form = useForm<z.infer<typeof newPlanformSchema>>({
    resolver: zodResolver(newPlanformSchema),
    defaultValues: {
      name: "",
      description: "",
      baseWorkout: {
        customExercises: []
      }
    },
  });

  const onSubmit = async (input: z.infer<typeof newPlanformSchema>) => {
    createPlan.mutate(input);
  };

  return (
    <NewPlanContext.Provider value={{ setValue: form.setValue, getValues: form.getValues }}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4 mb-4">
            {step === 1 &&
              <PlanInformation control={form.control} />
            }
            {step === 2 &&
              <BaseWorkoutSetup control={form.control} />
            }
          </div>
          {
            isReadyToSubmit ?
              <Button type="submit" className="w-full" isLoading={createPlan.isPending}>
                Create
              </Button> : <Button type="button" className="w-full" onClick={(e) => {
                e.preventDefault()
                onNext()
              }}>
                Next
              </Button>
          }
        </form>
      </Form>
    </NewPlanContext.Provider>
  );
}

export default NewPlanForm;