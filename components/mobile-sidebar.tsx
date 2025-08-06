"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  GraduationCap,
  CalendarDays,
  Clock,
  Home,
  Github,
  BookOpen,
  Users,
  Info,
  BookOpenCheck,
} from "lucide-react"

interface MobileSidebarProps {
  onNavigate?: (section: string) => void
}

export function MobileSidebar({ onNavigate }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)

  const handleNavigate = (section: string) => {
    setOpen(false)

    if (section === "assignments") {
      window.location.href = `/${section}` // Navigate to the new page
    } else {
      // Smooth scroll to section
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const menuItems = [
    {
      icon: Clock,
      label: "Today's Schedule",
      section: "today",
      description: "View today's and tomorrow's classes",
    },
    {
      icon: CalendarDays,
      label: "Full Schedule",
      section: "schedule",
      description: "Browse all days and periods",
    },
    {
      icon: BookOpen,
      label: "All Periods",
      section: "periods",
      description: "Switch between semester periods",
    },
    {
      icon: BookOpenCheck,
      label: "Assignments",
      section: "assignments",
      description: "View assignment details and deadlines",
    },
    {
      icon: Users,
      label: "Teachers",
      section: "teachers",
      description: "View instructor information",
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
                key={item.section}
                variant="ghost"
                className="w-full justify-start h-auto p-3 rounded-lg hover:bg-gray-100 transition-colors
                dark:hover:bg-gray-800" // Dark mode for button hover
                onClick={() => handleNavigate(item.section)}
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
          <div
            className="border-t border-gray-100 pt-6 space-y-2
          dark:border-gray-800"
          >
            {" "}
            {/* Dark mode for border */}
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-2 mb-2">Quick Actions</h3>{" "}
            {/* Dark mode for title */}
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-white border-gray-200 rounded-lg hover:bg-gray-50 transition-colors
              dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-300" // Dark mode for buttons
              onClick={() => window.location.reload()}
            >
              <Clock className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
              Refresh Time
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-white border-gray-200 rounded-lg hover:bg-gray-50 transition-colors
              dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-300" // Dark mode for buttons
              onClick={() => handleNavigate("today")}
            >
              <Home className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
              Go to Today
            </Button>
          </div>
        </div>
        {/* About Section (fixed at bottom) */}
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
            <a
              href="https://github.com/Orgpg/hnd-68-timetable"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-teal-600 hover:text-teal-800 transition-colors
              dark:text-teal-400 dark:hover:text-teal-300" // Dark mode for link
            >
              <Github className="h-3 w-3" />
              View Source Code
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 flex items-center gap-1">
              {" "}
              {/* Dark mode for text */}
              <Info className="h-3 w-3" />
              Version 1.0.0
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
