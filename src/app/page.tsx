import { currentUser, SignInButton, SignOutButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {user && (
          <div>
            <p>Hi, {user.firstName}!</p>
            <SignOutButton>Logout</SignOutButton>
          </div>
        )}
        {!user && <SignInButton>Login</SignInButton>}
      </div>
    </main>
  );
}
