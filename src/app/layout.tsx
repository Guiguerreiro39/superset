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
      <body className={cn(`font-sans ${inter.variable}`)}>
        <div className="h-screen w-full overflow-auto bg-slate-50">
          <div
            className="fixed inset-0"
            style={{
              backgroundImage: `radial-gradient(rgba(192, 132, 252, .2) 2px, transparent 0)`,
              backgroundSize: "15px 15px",
              backgroundPosition: "-16.5px -16.5px",
              maskImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 1), transparent 75%)`,
            }}
          />
          <ClerkProvider>
            <TRPCReactProvider>
              <div className="relative z-10 mx-auto h-screen w-full overflow-x-hidden">
                <PageTransition>
                  <main className="mb-20 p-4">{children}</main>
                </PageTransition>
                <Navbar />
              </div>
            </TRPCReactProvider>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
}
