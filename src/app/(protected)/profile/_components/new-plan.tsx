"use client"

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
import { Separator } from "@/components/ui/separator";

const NewPlan = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="w-full" asChild>
        <Button className="w-full rounded-md">New plan</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-screen space-y-4">
        <SheetHeader>
          <SheetTitle>
            Create a new workout plan
          </SheetTitle>
          <SheetDescription>
            This form will guide you through correctly structuring your new
            workout plan.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <NewPlanForm onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default NewPlan;
