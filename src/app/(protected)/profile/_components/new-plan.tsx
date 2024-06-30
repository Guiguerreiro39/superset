"use client";
import { Button } from "@/components/ui/button";
import NewPlanForm from "./new-plan-form";
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

const NewPlan = () => {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)

  const totalSteps = 2

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="w-full" asChild>
        <Button className="w-full rounded-md">New plan</Button>
      </SheetTrigger>
      <SheetContent side="bottom" fullscreen className="flex flex-col gap-0">
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
          <Progress value={(step / totalSteps) * 100} className="h-2" />
          <NewPlanForm onSuccess={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NewPlan;
