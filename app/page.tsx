"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MyanmarClock } from "@/components/myanmar-clock"
import { DailyTimetableView } from "@/components/daily-timetable-view"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, BellRing, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 sm:mb-12 max-w-4xl mx-auto"
          >
            <MyanmarClock />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-6xl mx-auto space-y-12"
          >
            <DailyTimetableView />

            {/* Call-to-action buttons */}
            <div className="pt-6 sm:pt-8 space-y-4">
              {/* Get Reminder CTA - Primary */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/reminder" aria-label="Get daily timetable reminders">
                    <span className="inline-flex items-center gap-3">
                      <BellRing className="h-5 w-5" />
                      <span className="font-semibold">Get Daily Reminders</span>
                      <Mail className="h-4 w-4 opacity-80" />
                    </span>
                  </Link>
                </Button>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 bg-white/50 hover:bg-white/80 border-teal-200 hover:border-teal-300 text-teal-700 hover:text-teal-800 shadow-md hover:shadow-lg transition-all duration-300 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 dark:border-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  <Link href="/schedule" aria-label="Open full weekly schedule">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-5 w-5" />
                      View Full Schedule
                    </span>
                  </Link>
                </Button>
              </motion.div>

              {/* Info text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center pt-2"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Never miss a class! Get your daily schedule delivered to your email at
                  <span className="font-semibold text-purple-600 dark:text-purple-400"> 9:00 PM</span> and
                  <span className="font-semibold text-purple-600 dark:text-purple-400"> 7:00 AM</span> Myanmar Time.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
