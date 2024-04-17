"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useNewPlan from "../_hooks/new-plan";

const NewPlan = () => {
  const { open, setOpen, form, onSubmit } = useNewPlan();

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
      <DrawerTrigger className="w-full" asChild>
        <Button className="w-full rounded-md">New plan</Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <DrawerHeader>
            <DrawerTitle className="text-left">
              Create a new workout plan
            </DrawerTitle>
            <DrawerDescription className="text-left">
              This form will guide you through correctly structuring your new
              workout plan.
            </DrawerDescription>
          </DrawerHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-4 pb-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your plan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default NewPlan;
