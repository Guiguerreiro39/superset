import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import { currentUser, SignInButton, SignOutButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {user && (
          <div>
            <p>Hi, {user.firstName}!</p>
            <SignOutButton>Logout</SignOutButton>
          </div>
        )}
        {!user && <SignInButton>Login</SignInButton>}
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
