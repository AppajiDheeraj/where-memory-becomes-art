"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  BookOpen,
  User,
  GalleryHorizontalEnd,
  Inbox,
  Settings,
  ChevronRight,
  ChevronDown,
  Video,
  MessageSquare,
  FolderOpen,
  LucideMoreHorizontal
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DashboardUserButton } from "./dashboard-user-button";
import { DashboardTrial } from "./dashboard-trial";
const NAV_SECTIONS = [
  {
    label: "Dashboard",
    icon: HomeIcon,
    href: "/home",
    sub: [],
  },
  {
    label: "Stories",
    icon: BookOpen,
    href: "/stories",
    sub: [
      { label: "All Stories", href: "/stories" },
      { label: "Manga Episodes", href: "/stories/manga" },
      { label: "AI Reels", href: "/stories/reels" },
      { label: "Life Chapters", href: "/stories/chapters" },
    ],
  },
  {
    label: "AI Characters",
    icon: User,
    href: "/characters",
    sub: [
      { label: "My Character", href: "/characters/me" },
      { label: "Friends & Family", href: "/characters/connections" },
      { label: "Add New Character", href: "/characters/new" },
    ],
  },
  {
    label: "Memory Inputs",
    icon: Inbox,
    href: "/memories",
    sub: [
      { label: "WhatsApp", href: "/memories/whatsapp" },
      { label: "Instagram", href: "/memories/instagram" },
      { label: "Gmail", href: "/memories/gmail" },
      { label: "Voice Notes", href: "/memories/audio" },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    sub: [],
  },
];


export const DashboardSidebar = () => {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href={"/"} className="flex items-center gap-2 px-3 py-1">
          <Image src={"/logo.svg"} height={36} width={36} alt="LifeBuddy" />
          <p className="text-2xl font-semibold">LifeBuddy</p>
        </Link>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        {/* Platform */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              {NAV_SECTIONS.map((item) => {
                const isOpen = openSection === item.label;
                const isActive = pathname.startsWith(item.href);

                return (
                  <div key={item.label}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={`h-9 hover:bg-sidebar/10 ${
                          isActive ? "bg-sidebar/10" : ""
                        }`}
                        onClick={() =>
                          item.sub.length > 0 &&
                          setOpenSection(isOpen ? null : item.label)
                        }
                      >
                        <div className="flex items-center w-full gap-2 cursor-pointer">
                          <item.icon size={16} className="opacity-80" />
                          <span className="text-sm flex-1">{item.label}</span>

                          {item.sub.length > 0 &&
                            (isOpen ? (
                              <ChevronDown size={14} className="opacity-70" />
                            ) : (
                              <ChevronRight size={14} className="opacity-70" />
                            ))}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* SUBMENU */}
                    {isOpen && item.sub.length > 0 && (
                      <div className="ml-6 mt-1 mb-2 flex flex-col gap-1 border-l border-sidebar/20">
                        {item.sub.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`text-xs py-1 pl-3 hover:bg-sidebar/10 rounded-sm ${
                              pathname === sub.href
                                ? "text-foreground font-medium"
                                : "text-muted-foreground"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Sample */}
        <SidebarGroup>
          <SidebarGroupLabel>Starred</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Inbox size={16} />
                    <span>Hostel Life</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <User size={16} />
                    <span>Family Life</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <LucideMoreHorizontal size={16} />
                    <span>More</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardTrial />
        <DashboardUserButton />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
