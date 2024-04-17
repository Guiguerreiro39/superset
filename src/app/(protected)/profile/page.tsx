import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserBMI from "./_components/user-bmi";
import UserProfile from "./_components/user-profile";
import WorkoutList from "./_components/workout-list";
import NewPlan from "./_components/new-plan";

export default function Home() {
  return (
    <Tabs defaultValue="plans" className="w-full">
      <div className="space-y-4">
        <UserProfile />
        <UserBMI />
      </div>
      <div className="sticky top-0 z-10 space-y-4 bg-neutral-50 py-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="plans" className="space-y-2">
        <NewPlan />
        <WorkoutList />
      </TabsContent>
    </Tabs>
  );
}
