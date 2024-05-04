import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Navbar from "./_components/navbar";
import PageTransition from "./transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Superset",
  description: "Plan and register your workouts with Superset!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          `font-sans ${inter.variable}`,
          "h-screen w-screen bg-slate-50",
        )}
      >
        <ClerkProvider>
          <TRPCReactProvider>
            <Navbar />
            <PageTransition>
              <main className="mb-20 p-4">{children}</main>
            </PageTransition>
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
