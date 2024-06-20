import { Tabs, TabsContent } from "@/components/ui/tabs";
import UserBMI from "./_components/user-bmi";
import UserProfile from "./_components/user-profile";
import NewPlan from "./_components/new-plan";
import { Suspense, lazy } from "react";
import Loading from "@/components/loading";
import WorkoutsMonthHistory from "./_components/workouts-month-history";
import ProfileTabs from "./_components/profile-tabs";

const PlansList = lazy(() => import("./_components/plans-list"));

export default function Home() {
  return (
    <Tabs defaultValue="history" className="w-full">
      <div className="space-y-4">
        <UserProfile />
        <UserBMI />
      </div>
      <ProfileTabs />
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
