import { currentUser } from "@clerk/nextjs";

type StatsComponentType = {
  value: number;
  unit: string;
};

const StatsComponent = ({ value, unit }: StatsComponentType) => {
  return (
    <div className="flex items-end justify-center gap-0.5">
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="mb-0.5 text-sm text-slate-400">{unit}</p>
    </div>
  );
};

const UserBMI = async () => {
  const user = await currentUser();

  const metadata = user?.publicMetadata;
  const height = metadata?.height as number;
  const weight = metadata?.weight as number;
  const bmi = weight / (height / 100) ** 2;

  return (
    <div className="grid grid-cols-3 gap-2">
      <StatsComponent value={weight} unit="kg" />
      <StatsComponent value={height} unit="cm" />
      <StatsComponent value={parseFloat(bmi.toFixed(1))} unit="BMI" />
    </div>
  );
};

export default UserBMI;
