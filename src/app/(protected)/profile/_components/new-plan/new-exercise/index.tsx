"use client"

import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from "@/components/ui/sheet";
import { useState } from "react";
import CreateExerciseForm from "./create-exercise-form";

const NewExercise = () => {
  const [open, setOpen] = useState(false)

  return (<Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger className="w-full" asChild>
      <Button variant="outline">Add a new exercise</Button>
    </SheetTrigger>
    <SheetContent side="bottom" fullscreen>
      <div className="space-y-4 h-full flex flex-col">
        <SheetHeader>
          <SheetTitle>
            Add new Exercises
          </SheetTitle>
          <SheetDescription>
            Select one or more exercises or create a new one in order to add it to your new plan.
          </SheetDescription>
        </SheetHeader>
        <CreateExerciseForm />
      </div>
    </SheetContent>
  </Sheet>);
}

export default NewExercise;