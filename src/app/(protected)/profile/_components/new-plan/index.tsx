"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import NewPlanForm from "./new-plan-form";

const totalSteps = 2

const NewPlan = () => {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)

  const onNext = () => {
    setStep((prev) => prev + 1)
  }

  const onPrevious = () => {
    setStep((prev) => prev - 1)
  }

  const isReadyToSubmit = step === totalSteps
  const onClose = isReadyToSubmit ? onPrevious : undefined

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="w-full" asChild>
        <Button className="w-full rounded-md">New plan</Button>
      </SheetTrigger>
      <SheetContent side="bottom" fullscreen className="flex flex-col gap-0" onClose={onClose}>
        <div className="space-y-4 flex-1 flex flex-col">
          <SheetHeader>
            <SheetTitle>
              Create a new workout plan
            </SheetTitle>
            <SheetDescription>
              This form will guide you through correctly structuring your new
              workout plan.
            </SheetDescription>
          </SheetHeader>
          <Progress value={((step - 1) / totalSteps) * 100} className="h-2" />
          <NewPlanForm onClose={() => setOpen(false)} onNext={onNext} onPrevious={onPrevious} step={step} isReadyToSubmit={isReadyToSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NewPlan;
