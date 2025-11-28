"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Plus,
  MessageCircle,
  User,
} from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/manga", label: "Manga", icon: BookOpen },
    { href: "/create", label: "", icon: Plus, center: true },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-background/90 backdrop-blur-xl
        border-t border-border
        flex items-center justify-around
        py-3
        rounded-t-2xl
        shadow-[0_-4px_18px_rgba(0,0,0,0.08)]
        lg:hidden
      "
    >
      {items.map(({ href, icon: Icon, label, center }) => {
        const active = pathname === href;

        if (center) {
          return (
            <Link
              key={href}
              href={href}
              className="relative -mt-8"
            >
              <div
                className="
                  h-14 w-14 rounded-full
                  bg-primary text-primary-foreground
                  flex items-center justify-center
                  shadow-xl
                  hover:scale-110 active:scale-95
                  transition-all
                "
              >
                <Icon className="h-7 w-7" />
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={href}
            href={href}
            className="
              flex flex-col items-center justify-center gap-1 group
            "
          >
            <Icon
              className={`
                h-6 w-6 transition-all
                ${active ? "text-primary scale-110" : "text-muted-foreground"}
              `}
            />
            <span
              className={`
                text-[10px] font-medium transition
                ${active ? "text-primary" : "text-muted-foreground/70"}
              `}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
