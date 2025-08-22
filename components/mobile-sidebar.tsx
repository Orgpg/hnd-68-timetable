"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  GraduationCap,
  CalendarDays,
  Home,
  Github,
  Info,
  BookOpenCheck,
  Mail,
  BellRing,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface MobileSidebarProps {
  onNavigate?: (section: string) => void;
}

export function MobileSidebar({ onNavigate }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleNavigate = (pathOrSection: string, isExternal?: boolean) => {
    setOpen(false);

    if (isExternal) {
      window.open(pathOrSection, "_blank");
    } else if (pathOrSection.startsWith("/")) {
      window.location.href = pathOrSection;
    } else if (pathOrSection.startsWith("#")) {
      const element = document.getElementById(pathOrSection.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActiveItem = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      pathOrSection: "/",
      description: "Main dashboard",
    },
    {
      icon: CalendarDays,
      label: "Schedule",
      pathOrSection: "/schedule",
      description: "Weekly timetable",
    },
    {
      icon: BookOpenCheck,
      label: "Assignments",
      pathOrSection: "/assignments",
      description: "Tasks & deadlines",
    },
    {
      icon: BellRing,
      label: "Reminders",
      pathOrSection: "/reminder",
      description: "Daily notifications",
    },
    {
      icon: Mail,
      label: "Feedback",
      pathOrSection: "/feedback",
      description: "Send feedback",
    },
    {
      icon: Github,
      label: "GitHub",
      pathOrSection: "https://github.com/Orgpg/hnd-68-timetable",
      description: "Source code",
      isExternal: true,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden rounded-xl bg-gray-100/70 dark:bg-gray-800/70 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 backdrop-blur-sm transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 bg-white/90 backdrop-blur-xl flex flex-col p-0 border-r border-gray-200/50
      dark:bg-gray-900/90 dark:border-gray-700/50"
      >
        <SheetHeader
          className="pb-6 pt-6 px-6 border-b border-gray-200/50
        dark:border-gray-700/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <SheetTitle className="text-left text-lg font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                HND 68 Schedule
              </SheetTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Class Timetable
              </p>
            </div>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-2 mb-4">
              Navigation
            </h3>
            {menuItems.map((item) => {
              const isActive =
                !item.isExternal && isActiveItem(item.pathOrSection);
              return (
                <Button
                  key={item.pathOrSection}
                  variant="ghost"
                  className={`w-full justify-start h-auto p-4 rounded-xl transition-all duration-200 relative ${
                    isActive
                      ? "bg-teal-50/80 dark:bg-teal-900/30 border border-teal-200/50 dark:border-teal-700/50"
                      : "hover:bg-gray-100/70 dark:hover:bg-gray-800/70"
                  }`}
                  onClick={() =>
                    handleNavigate(item.pathOrSection, item.isExternal)
                  }
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-r-full"></div>
                  )}
                  <div className="flex items-start gap-3 ml-2">
                    <item.icon
                      className={`h-5 w-5 mt-0.5 ${
                        isActive
                          ? "text-teal-600 dark:text-teal-400"
                          : "text-teal-600"
                      }`}
                    />
                    <div className="text-left">
                      <div
                        className={`font-medium ${
                          isActive
                            ? "text-teal-700 dark:text-teal-300"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
        <div
          className="border-t border-gray-200/50 pt-6 pb-4 mt-auto px-6
        dark:border-gray-700/50"
        >
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-2 mb-3">
            About
          </h3>
          <div
            className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-xl p-4 space-y-3 backdrop-blur-sm
          dark:from-gray-800/80 dark:to-gray-900/50"
          >
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              HND 68 Schedule App - Your personalized class timetable with
              real-time Myanmar time updates.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Version 1.1.0
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
