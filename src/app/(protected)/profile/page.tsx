import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserBMI from "./_components/user-bmi";
import UserProfile from "./_components/user-profile";
import NewPlan from "./_components/new-plan";
import { Suspense, lazy } from "react";
import Loading from "@/components/loading";
import WorkoutsMonthHistory from "./_components/workouts-month-history";

const PlansList = lazy(() => import("./_components/plans-list"));

export default function Home() {
  return (
    <Tabs defaultValue="history" className="w-full">
      <div className="space-y-4">
        <UserProfile />
        <UserBMI />
      </div>
      <div className="sticky top-0 z-10 space-y-4 bg-slate-50 py-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="plans">My Plans</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="plans" className="space-y-2">
        <NewPlan />
        <Suspense fallback={<Loading />}>
          <PlansList />
        </Suspense>
      </TabsContent>
      <TabsContent value="history" className="space-y-2">
        <WorkoutsMonthHistory />
      </TabsContent>
    </Tabs>
  );
}
