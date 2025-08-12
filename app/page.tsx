'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MyanmarClock } from "@/components/myanmar-clock"
import { DailyTimetableView } from "@/components/daily-timetable-view"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 relative">
            {/* Logo */}
            <Image
              src="/hero.png" // Use the new logo image
              alt="Gusto College Logo"
              width={200} // Increased width
              height={120} // Increased height
              className="mx-auto mb-4 rounded-lg shadow-lg" // Adjusted class for the new logo shape
            />

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
              HND 68{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                Timetable
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-md sm:text-base">Year 1, Module 1</p>
            <p className="text-gray-600 dark:text-gray-400 text-md sm:text-base"> Program Leader _ Daw Yee Mon</p>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Your personalized class schedule with real-time updates.
            </p>
          </div>

          <div className="mb-8 sm:mb-12 max-w-4xl mx-auto">
            <MyanmarClock />
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            <DailyTimetableView />
            {/* Centered call-to-action */}
            <div className="pt-6 sm:pt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md"
              >
                <Link href="/schedule" aria-label="Open full weekly schedule">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    View full schedule
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
