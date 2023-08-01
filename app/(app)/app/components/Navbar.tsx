"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();

  const routes = [
    {
      name: "Home",
      href: "/app",
      active: pathname === "/app",
    },
    {
      name: "Settings",
      href: "/app/settings",
      active: pathname === "/settings",
    },
  ];

  return (
    <div className="border-b w-full">
      <div className="flex items-center justify-between h-16 p-4">
        <p>Logo</p>
        <nav className="space-x-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              className={cn(
                "text-base font-medium hover:text-black text-black transition-colors",
                route.active ? "text-black" : "text-muted-foreground"
              )}
              href={route.href}>
              {route.name}
            </Link>
          ))}
        </nav>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
