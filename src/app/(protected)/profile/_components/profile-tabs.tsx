"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ProfileTabs = () => {
  const invisibleSpanRef = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(invisibleSpanRef)

  return <>
    <span className="invisible absolute" ref={invisibleSpanRef} />
    <div className={cn("z-10 space-y-4 py-4", !isInView && "sticky top-0 bg-slate-50")}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="plans">My Plans</TabsTrigger>
      </TabsList>
    </div>
  </>
}

export default ProfileTabs;