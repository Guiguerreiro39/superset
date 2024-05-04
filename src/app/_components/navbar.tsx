"use client";

import { cn } from "@/lib/utils";
import { CircleUserIcon, Home, Plus, type LucideIcon } from "lucide-react";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavActionType = {
  icon: LucideIcon;
  href: Url;
};

type NavItemType = {
  label: string;
} & NavActionType;

const NavItem = ({ icon: Icon, href, label }: NavItemType) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "cols-span-1 flex flex-col items-center justify-start gap-1.5 transition-all",
        href === pathname && "scale-105 text-lime-600",
      )}
    >
      <Icon className="h-8 w-8" />
      <h3 className="text-center text-sm font-light">{label}</h3>
    </Link>
  );
};

const NavAction = ({ icon: Icon, href }: NavActionType) => {
  return (
    <div className="cols-span-1 relative w-full">
      <Link
        href={href}
        className="absolute -top-1/2 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-lime-600 p-2.5 text-white hover:bg-lime-700"
      >
        <Icon className="h-10 w-10" />
      </Link>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="absolute bottom-0 z-50 grid h-20 w-full grid-cols-3 gap-4 bg-white px-4 py-2">
      <NavItem icon={Home} href="/" label="Feed" />
      <NavAction icon={Plus} href="/workout" />
      <NavItem icon={CircleUserIcon} href="/profile" label="Profile" />
    </nav>
  );
};

export default Navbar;
