"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReminderForm } from "@/components/reminder-form"
import { BellRing } from "lucide-react"
import React from "react" // Import React for Suspense

export default function ReminderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <BellRing className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-teal-600 dark:text-teal-400 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
              Daily Timetable{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                Reminders
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Never miss a class! Get your daily schedule delivered straight to your inbox.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {/* Wrap ReminderForm with Suspense to resolve useSearchParams error */}
            <React.Suspense fallback={<div>Loading reminder form...</div>}>
              <ReminderForm />
            </React.Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
