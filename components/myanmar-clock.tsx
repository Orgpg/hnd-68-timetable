"use client"

import { useState, useEffect } from "react"
import { getCurrentDay, getTomorrowDay } from "@/lib/utils/date-utils"
import { Clock, Calendar } from "lucide-react"

export function MyanmarClock() {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const currentDay = getCurrentDay()
  const tomorrowDay = getTomorrowDay()

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-4">
          <Clock className="h-6 w-6 sm:h-7 sm:w-7 mr-3" />
          <h2 className="text-xl sm:text-2xl font-bold">Myanmar Time</h2>
        </div>

        <div className="text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl font-mono font-extrabold mb-3 tracking-wider drop-shadow-md">
            {time.toLocaleTimeString("en-US", {
              timeZone: "Asia/Yangon",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </div>

          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="text-base sm:text-lg md:text-xl font-medium">
              {time.toLocaleDateString("en-US", {
                timeZone: "Asia/Yangon",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 text-sm sm:text-base font-medium">
              Today: <span className="font-bold">{currentDay}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 text-sm sm:text-base font-medium">
              Tomorrow: <span className="font-bold">{tomorrowDay}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
