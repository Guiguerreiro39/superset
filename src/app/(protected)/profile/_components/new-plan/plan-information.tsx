import { Control } from "react-hook-form";
import { newPlanformSchema } from "./new-plan-form";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PlanInformationProps = {
  control: Control<z.infer<typeof newPlanformSchema>>
}

const PlanInformation = ({ control }: PlanInformationProps) => {
  return (<>
    <FormField
      control={control}
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
      control={control}
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
  </>);
}

export default PlanInformation;