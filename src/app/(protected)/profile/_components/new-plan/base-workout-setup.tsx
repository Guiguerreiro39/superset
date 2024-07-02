import { Control } from "react-hook-form";
import { z } from "zod";
import { newPlanformSchema } from "./new-plan-form";

type BaseWorkoutSetupProps = {
  control: Control<z.infer<typeof newPlanformSchema>>
}

const BaseWorkoutSetup = ({ control }: BaseWorkoutSetupProps) => {
  return (
    <p>Hello</p>
  );
}

export default BaseWorkoutSetup;