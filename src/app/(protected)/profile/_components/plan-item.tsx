import { Badge } from "@/components/ui/badge";
import { planRouter } from "@/server/api/routers/plan";
import { LandPlot } from "lucide-react";

type PlanItemProps = {
  plan: Awaited<ReturnType<typeof planRouter.getAll>>[0]
}

const PlanItem = ({ plan }: PlanItemProps) => {
  return (<li
    style={{
      backgroundImage:
        "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('/assets/images/gym.jpeg')",
    }}
    className="flex min-h-[10rem] w-full flex-col justify-between rounded-md bg-neutral-500 bg-cover p-4 text-white shadow-inner"
  >
    <div className="flex items-center gap-1">
      <Badge className="bg-white/50 text-white backdrop-blur-sm">
        Tag 1
      </Badge>
      <Badge className="bg-white/50 text-white backdrop-blur-sm">
        Tag 2
      </Badge>
    </div>
    <div className="flex flex-col gap-1">
      <h2 className="truncate text-lg font-semibold">{plan.name}</h2>
      <div className="flex items-center gap-1 text-sm">
        <LandPlot className="h-4 w-4" />
        <span>{plan.exercises.length} Exercises</span>
      </div>
    </div>
  </li>);
}

export default PlanItem;