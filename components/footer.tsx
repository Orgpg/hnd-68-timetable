"use client";

import { Github, CalendarDays, Link, Mail, Users } from "lucide-react"; // Import Mail icon and Users icon
import { useEffect, useState } from "react"; // Added React hooks for state management

export function Footer() {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        if (data.success) {
          setSubscriberCount(data.subscriberCount);
        }
      } catch (error) {
        console.error("Failed to fetch subscriber count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriberCount();
  }, []);

  return (
    <footer
      className="mt-16 border-t border-gray-200 bg-white py-10 sm:py-14
    dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-full border border-teal-200 dark:border-teal-700">
            <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <span className="text-sm font-medium text-teal-800 dark:text-teal-200">
              {isLoading ? (
                "Loading subscribers..."
              ) : subscriberCount !== null ? (
                <>
                  <span className="font-bold text-lg">
                    {subscriberCount.toLocaleString()}
                  </span>
                  <span className="ml-1">active subscribers</span>
                </>
              ) : (
                "Subscriber count unavailable"
              )}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Join our community for daily timetable reminders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Section 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <CalendarDays className="h-6 w-6 text-teal-600" />
              <h3 className="text-lg font-semibold">HND 68 Timetable</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Your essential companion for managing the HND 68 class schedule.
              Stay updated with real-time Myanmar time and easily navigate your
              daily and weekly classes.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Quick Links
            </h3>{" "}
            {/* Added dark mode text color */}
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {" "}
              {/* Added dark mode text color */}
              <li>
                <a
                  href="/"
                  className="hover:text-teal-600 transition-colors dark:hover:text-teal-400"
                >
                  Today's Schedule
                </a>
              </li>
              <li>
                <a
                  href="/schedule"
                  className="hover:text-teal-600 transition-colors dark:hover:text-teal-400"
                >
                  Full Schedule
                </a>
              </li>
              <li>
                <a
                  href="/assignments"
                  className="hover:text-teal-600 transition-colors dark:hover:text-teal-400"
                >
                  Assignments
                </a>
              </li>
              <li>
                <a
                  href="/reminder"
                  className="hover:text-teal-600 transition-colors dark:hover:text-teal-400"
                >
                  Reminder
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Connect
            </h3>{" "}
            {/* Added dark mode text color */}
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {" "}
              {/* Added dark mode text color */}
              <li>
                <a
                  href="https://waiphyoaung.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-teal-600 transition-colors dark:hover:text-teal-400"
                >
                  <Link className="h-4 w-4" />
                  Designed by Wai Phyo Aung
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Orgpg/hnd-68-timetable"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-teal-600 transition-colors dark:hover:text-teal-400"
                >
                  <Github className="h-4 w-4" />
                  View Source Code
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@waiphyoaung.dev"
                  className="inline-flex items-center gap-2 hover:text-teal-600 transition-colors dark:hover:text-teal-400"
                >
                  <Mail className="h-4 w-4" />
                  info@waiphyoaung.dev
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Placeholder for future additions (e.g., Contact Info, Legal) */}
          <div className="space-y-4 hidden lg:block">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              More Info
            </h3>{" "}
            {/* Added dark mode text color */}
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {" "}
              {/* Added dark mode text color */}
              <li>
                <a
                  href="#"
                  className="hover:text-teal-600 transition-colors dark:hover:text-teal-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-teal-600 transition-colors dark:hover:text-teal-400"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div
          className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500
        dark:border-gray-800 dark:text-gray-500"
        >
          <p className="mb-1">
            © {new Date().getFullYear()} waiphyoaung. All rights reserved.
          </p>
          <p className="text-xs">Version 1.1.0</p> {/* Added Version */}
        </div>
      </div>
    </footer>
  );
}
