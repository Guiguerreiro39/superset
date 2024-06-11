import { api } from "@/trpc/server";
import PlanItem from "./plan-item";

const PlansList = async () => {
  const plans = await api.plan.getAll()

  const isEmpty = plans.length === 0;

  if (isEmpty) {
    return (
      <p className="w-full py-8 text-center font-semibold text-slate-500">
        There are no plans to show
      </p>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-2">
      {plans.map((plan) => (
        <PlanItem plan={plan} key={plan.id} />
      ))}
    </ul>
  );
};

export default PlansList;
