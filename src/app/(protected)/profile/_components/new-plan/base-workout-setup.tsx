import { Control, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { newPlanformSchema } from "./new-plan-form";
import NewExercise from "./new-exercise";

type BaseWorkoutSetupProps = {
  control: Control<z.infer<typeof newPlanformSchema>>
}

const BaseWorkoutSetup = ({ control }: BaseWorkoutSetupProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "baseWorkout.customExercises"
  });

  return (
    <>
      <NewExercise />
    </>
  );
}

export default BaseWorkoutSetup;