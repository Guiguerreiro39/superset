import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import NewExerciseForm from "./new-exercise-form";
import { useToast } from "@/components/ui/use-toast";

type NewExerciseDrawerProps = {
  name: string
}

const NewExerciseDrawer = ({ name }: NewExerciseDrawerProps) => {
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const onCreateExerciseSuccess = () => {
    setOpen(false)
    toast({
      title: "A new Exercise has been created!"
    })
  }

  return (<Drawer open={open} onOpenChange={setOpen}>
    <DrawerTrigger asChild>
      <Button variant="outline" className="w-full">Create a new exercise</Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm p-4">
        <NewExerciseForm name={name} onSuccess={onCreateExerciseSuccess} />
      </div>
    </DrawerContent>
  </Drawer>);
}

export default NewExerciseDrawer;