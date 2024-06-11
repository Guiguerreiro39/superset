"use client";;
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import NewPlanForm from "./new-plan-form";

const NewPlan = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
      <DrawerTrigger className="w-full" asChild>
        <Button className="w-full rounded-md">New plan</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-left">
            Create a new workout plan
          </DrawerTitle>
          <DrawerDescription className="text-left">
            This form will guide you through correctly structuring your new
            workout plan.
          </DrawerDescription>
        </DrawerHeader>
        <NewPlanForm onSuccess={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
};

export default NewPlan;
