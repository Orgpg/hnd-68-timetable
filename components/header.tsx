"use client"

import { GraduationCap, Moon, Sun, Github } from "lucide-react"
import { MobileSidebar } from "./mobile-sidebar"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect runs only on the client side after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavigate = (section: string) => {
    // This will be handled by the MobileSidebar component
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm
    dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
                HND 68 Schedule
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Class Timetable</p>
            </div>
          </Link>

          {/* Mobile sidebar and Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && ( // Only render on client after mount
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 backdrop-blur-sm"
              >
                {resolvedTheme === "dark" ? ( // Use resolvedTheme here
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
            <MobileSidebar onNavigate={handleNavigate} />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors dark:text-gray-300 dark:hover:text-teal-400"
            >
              Home
            </Link>
            <Link
              href="/schedule"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors dark:text-gray-300 dark:hover:text-teal-400"
            >
              Schedule
            </Link>
            <Link
              href="/assignments"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors dark:text-gray-300 dark:hover:text-teal-400"
            >
              Assignments
            </Link>
            <Link
              href="/reminder"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors dark:text-gray-300 dark:hover:text-teal-400"
            >
              Reminder
            </Link>
            <Link
              href="/feedback"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors dark:text-gray-300 dark:hover:text-teal-400"
            >
              Feedback
            </Link>
            <a
              href="https://github.com/Orgpg/hnd-68-timetable"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 transition-colors dark:text-gray-300 dark:hover:text-teal-400"
              aria-label="View Source Code on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            {/* Desktop Theme Toggle */}
            {mounted && ( // Only render on client after mount
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 backdrop-blur-sm"
              >
                {resolvedTheme === "dark" ? ( // Use resolvedTheme here
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
