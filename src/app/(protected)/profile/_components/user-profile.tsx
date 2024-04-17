import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

const UserProfile = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col items-center">
      {user?.hasImage && (
        <Image
          width={80}
          height={80}
          src={user?.imageUrl}
          className="mb-2.5 rounded-full border-4 border-slate-200 object-cover shadow"
          alt={`${user?.firstName} ${user?.lastName}`}
        />
      )}
      <h1 className="text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</h1>
      <p className="text-sm font-semibold text-slate-400">Crossfit</p>
    </div>
  );
};

export default UserProfile;
