"use client";

import { GraduationCap, Moon, Sun, Github } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";


export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigate = (section: string) => {
    // This will be handled by the MobileSidebar component
  };

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-lg
    dark:border-gray-700/50 dark:bg-gray-900/80 dark:supports-[backdrop-filter]:bg-gray-900/70"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Image
                src="/gusto-logo.png" // <-- your logo file here (public/logo.png)
                alt="HND Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                HND 68 Schedule
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Class Timetable
              </p>
            </div>
          </Link>

          {/* Mobile sidebar and Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl bg-gray-100/70 dark:bg-gray-800/70 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 backdrop-blur-sm transition-all duration-200"
              >
                {resolvedTheme === "dark" ? (
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
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-100/70 dark:hover:bg-gray-800/70 ${
                isActiveLink("/")
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50/70 dark:bg-teal-900/20"
                  : "text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              }`}
            >
              Home
              {isActiveLink("/") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
              )}
            </Link>
            <Link
              href="/schedule"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-100/70 dark:hover:bg-gray-800/70 ${
                isActiveLink("/schedule")
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50/70 dark:bg-teal-900/20"
                  : "text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              }`}
            >
              Schedule
              {isActiveLink("/schedule") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
              )}
            </Link>
            <Link
              href="/assignments"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-100/70 dark:hover:bg-gray-800/70 ${
                isActiveLink("/assignments")
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50/70 dark:bg-teal-900/20"
                  : "text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              }`}
            >
              Assignments
              {isActiveLink("/assignments") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
              )}
            </Link>
            <Link
              href="/reminder"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-100/70 dark:hover:bg-gray-800/70 ${
                isActiveLink("/reminder")
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50/70 dark:bg-teal-900/20"
                  : "text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              }`}
            >
              Reminder
              {isActiveLink("/reminder") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
              )}
            </Link>
            <Link
              href="/feedback"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-100/70 dark:hover:bg-gray-800/70 ${
                isActiveLink("/feedback")
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50/70 dark:bg-teal-900/20"
                  : "text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              }`}
            >
              Feedback
              {isActiveLink("/feedback") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
              )}
            </Link>
            {/* <a
              href="https://github.com/Orgpg/hnd-68-timetable"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-teal-600 transition-all duration-200 rounded-lg hover:bg-gray-100/70 dark:text-gray-300 dark:hover:text-teal-400 dark:hover:bg-gray-800/70"
              aria-label="View Source Code on GitHub"
            >
              <Github className="h-5 w-5" />
            </a> */}
            {/* Desktop Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2 rounded-xl bg-gray-100/70 dark:bg-gray-800/70 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 backdrop-blur-sm transition-all duration-200"
              >
                {resolvedTheme === "dark" ? (
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
  );
}
