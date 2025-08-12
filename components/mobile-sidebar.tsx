"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, GraduationCap, CalendarDays, Home, Github, Info, BookOpenCheck, Mail, BellRing } from "lucide-react"

interface MobileSidebarProps {
  onNavigate?: (section: string) => void
}

export function MobileSidebar({ onNavigate }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)

  const handleNavigate = (pathOrSection: string, isExternal?: boolean) => {
    setOpen(false) // Close sidebar on navigation

    if (isExternal) {
      window.open(pathOrSection, "_blank")
    } else if (pathOrSection.startsWith("/")) {
      // It's a Next.js route
      window.location.href = pathOrSection
    } else if (pathOrSection.startsWith("#")) {
      // It's an internal section ID
      const element = document.getElementById(pathOrSection.substring(1)) // Remove '#'
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      pathOrSection: "/",
      description: "Go to the main dashboard",
    },
    {
      icon: CalendarDays,
      label: "Schedule",
      pathOrSection: "/schedule",
      description: "View full weekly tables",
    },
    {
      icon: BookOpenCheck,
      label: "Assignments",
      pathOrSection: "/assignments",
      description: "View assignment details and deadlines",
    },
    {
      icon: BellRing,
      label: "Reminders",
      pathOrSection: "/reminder",
      description: "Manage daily timetable reminders",
    },
    {
      icon: Mail,
      label: "Feedback",
      pathOrSection: "/feedback",
      description: "Send us your suggestions or bug reports",
    },
    {
      icon: Github,
      label: "GitHub",
      pathOrSection: "https://github.com/Orgpg/hnd-68-timetable",
      description: "View the project source code on GitHub",
      isExternal: true, // Add this property for external links
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 bg-white/80 backdrop-blur-lg flex flex-col p-0
      dark:bg-gray-950/80 dark:border-gray-800"
      >
        {" "}
        {/* Dark mode for sheet content */}
        <SheetHeader
          className="pb-6 pt-6 px-6 border-b border-gray-100
        dark:border-gray-800"
        >
          {" "}
          {/* Dark mode for sheet header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <SheetTitle className="text-left text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
                HND 68 Schedule
              </SheetTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400">Class Timetable</p> {/* Dark mode for text */}
            </div>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
          {/* Navigation Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-2 mb-2">Navigation</h3>{" "}
            {/* Dark mode for title */}
            {menuItems.map((item) => (
              <Button
                key={item.pathOrSection}
                variant="ghost"
                className="w-full justify-start h-auto p-3 rounded-lg hover:bg-gray-100 transition-colors
                dark:hover:bg-gray-800" // Dark mode for button hover
                onClick={() => handleNavigate(item.pathOrSection, item.isExternal)}
              >
                <div className="flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div className="text-left">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{item.label}</div>{" "}
                    {/* Dark mode for label */}
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>{" "}
                    {/* Dark mode for description */}
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Quick Actions Section */}
        </div>{" "}
        {/* Add this closing div for the flex-1 overflow-y-auto div */}
        <div
          className="border-t border-gray-100 pt-6 pb-4 mt-auto px-6
        dark:border-gray-800"
        >
          {" "}
          {/* Dark mode for border */}
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-2 mb-3">About</h3>{" "}
          {/* Dark mode for title */}
          <div
            className="bg-gray-50 rounded-lg p-4 space-y-3
          dark:bg-gray-800"
          >
            {" "}
            {/* Dark mode for about card */}
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {" "}
              {/* Dark mode for text */}
              HND 68 Schedule App - Your personalized class timetable with real-time Myanmar time updates.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 flex items-center gap-1">
              {" "}
              {/* Dark mode for text */}
              <Info className="h-3 w-3" />
              Version 1.1.0
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
