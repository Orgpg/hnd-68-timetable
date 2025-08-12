"use client"

import { useEffect, useMemo, useState } from "react"
import type { DayOfWeek, ClassSession } from "@/lib/timetable/data"
import {
  getMyanmarDate,
  formatDate,
  formatSessionTime,
  getUnitColor,
  getUnitIcon,
  getDayName,
  isHoliday,
  parseTime, // optional local use
} from "@/lib/utils/date-utils"
import { DailySchedulePreview } from "./daily-schedule-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronLeft, ChevronRight, BookOpen, Clock, GraduationCap, Home, Sparkles, Sun } from 'lucide-react'
import { getDailyEntryByDate, ygnDateKey, getPeriodLabelFor } from "@/lib/timetable"

// Helper to add days (works in local Date; display handled via Myanmar TZ formatters)
function addDays(d: Date, n: number) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

// Determines if a class session for a specific calendar date is already completed
function isSessionCompletedAtDateLocal(session: ClassSession, dateAtYGN: Date): boolean {
  // Current "now" in Myanmar time
  const now = getMyanmarDate()

  // Normalize "HH:MM-HH:MM" variants (strip spaces)
  const timeRange = session.time.replace(/\s/g, "")
  const [_, endStr] = timeRange.split("-")
  const end = parseTime(endStr, dateAtYGN)
  return now.getTime() > end.getTime()
}

export function DailyTimetableView() {
  // Anchor everything to Myanmar time
  const todayYGN = useMemo(() => getMyanmarDate(), [])
  const [selectedDate, setSelectedDate] = useState<Date>(todayYGN)

  // Today / Tomorrow entries (date-aware, from the new daily files)
  const todayEntry = useMemo(() => getDailyEntryByDate(todayYGN), [todayYGN])
  const tomorrowEntry = useMemo(() => getDailyEntryByDate(addDays(todayYGN, 1)), [todayYGN])

  const todayFullDate = useMemo(() => formatDate(todayYGN), [todayYGN])
  const tomorrowFullDate = useMemo(() => formatDate(addDays(todayYGN, 1)), [todayYGN])

  // Selected day entry
  const selectedEntry = useMemo(() => getDailyEntryByDate(selectedDate), [selectedDate])
  const selectedFullDate = useMemo(() => formatDate(selectedDate), [selectedDate])

  const periodLabel = useMemo(() => getPeriodLabelFor(ygnDateKey(selectedDate)), [selectedDate])

  // Handlers for arrow navigation
  const prevDay = () => setSelectedDate((d) => addDays(d, -1))
  const nextDay = () => setSelectedDate((d) => addDays(d, 1))

  const selectedIsHoliday = selectedEntry
    ? isHoliday(selectedEntry.dayCode as DayOfWeek) || Boolean(selectedEntry.label)
    : false

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Period Label */}
      <Card className="bg-gradient-to-r from-white to-gray-50 border-none shadow-lg dark:from-gray-900 dark:to-gray-950">
        <CardHeader className="p-4 sm:p-6 flex flex-col items-center justify-center text-center">
          <CardTitle className="text-lg sm:text-xl mb-1 flex flex-col sm:flex-row items-center gap-2 text-gray-800 dark:text-gray-200">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
            <span className="hidden sm:inline">HND 68 Timetable</span>
            <span className="sm:hidden">HND 68</span>
          </CardTitle>
          <p className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full inline-block dark:text-gray-400 dark:bg-gray-800">
            {periodLabel}
          </p>
        </CardHeader>
      </Card>

      {/* Today & Tomorrow Preview (date-aware) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6" id="today">
        <DailySchedulePreview
          day={(todayEntry?.dayCode as DayOfWeek) ?? "MON"}
          sessions={(todayEntry?.sessions as ClassSession[]) ?? []}
          label="Today's Schedule"
          isToday={true}
          fullDate={todayFullDate}
          holidayNote={todayEntry?.label}
          dateForSession={todayYGN}
        />
        <DailySchedulePreview
          day={(tomorrowEntry?.dayCode as DayOfWeek) ?? "TUE"}
          sessions={(tomorrowEntry?.sessions as ClassSession[]) ?? []}
          label="Tomorrow's Schedule"
          fullDate={tomorrowFullDate}
          holidayNote={tomorrowEntry?.label}
          dateForSession={addDays(todayYGN, 1)}
        />
      </div>

      {/* Day-to-day Navigator with < > arrows (date-driven) */}
      <Card
        className={`border-none shadow-lg ${
          selectedIsHoliday
            ? "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950"
            : "bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950"
        }`}
        id="schedule"
      >
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevDay}
              size="sm"
              className="rounded-full bg-white/70 hover:bg-white border-gray-200 dark:bg-gray-800/70 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Button>

            <CardTitle className="text-lg sm:text-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center">
              {selectedIsHoliday ? (
                <Home className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              ) : (
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
              )}
              <span
                className={`bg-gradient-to-r ${
                  selectedIsHoliday ? "from-orange-600 to-amber-600" : "from-teal-600 to-cyan-600"
                } bg-clip-text text-transparent`}
              >
                {(selectedEntry?.dayCode ?? "MON") + " - " + getDayName((selectedEntry?.dayCode as DayOfWeek) ?? "MON")}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{selectedFullDate}</span>
              {selectedIsHoliday && (
                <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  {selectedEntry?.label ?? "Holiday"}
                </span>
              )}
            </CardTitle>

            <Button
              variant="outline"
              onClick={nextDay}
              size="sm"
              className="rounded-full bg-white/70 hover:bg-white border-gray-200 dark:bg-gray-800/70 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Selected Day Detail (date-aware, completed state against actual Myanmar now) */}
      <Card className="overflow-hidden shadow-xl border-none">
        <CardContent className="p-0">
          {selectedEntry && selectedEntry.sessions.length > 0 ? (
            <div className="space-y-0">
              {selectedEntry.sessions.map((session, index) => {
                const completed = isSessionCompletedAtDateLocal(session as ClassSession, selectedDate)
                return (
                  <div
                    key={`${ygnDateKey(selectedDate)}_${index}`}
                    className={`relative overflow-hidden bg-gradient-to-r ${getUnitColor(session.unit)} p-4 sm:p-6 text-white ${
                      index === 0 ? "rounded-t-lg" : ""
                    } ${index === selectedEntry.sessions.length - 1 ? "rounded-b-lg" : ""} transition-all duration-300 ${
                      completed ? "opacity-60 grayscale-[50%]" : "hover:shadow-lg"
                    }`}
                  >
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-2xl sm:text-4xl opacity-30">
                      {getUnitIcon(session.unit)}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Clock className="h-4 w-4 sm:h-6 sm:w-6" />
                      <span
                        className={`font-bold text-base sm:text-xl bg-white/20 px-3 sm:px-4 py-1 sm:py-2 rounded-full ${
                          completed ? "line-through" : ""
                        }`}
                      >
                        {formatSessionTime(session.time)}
                      </span>
                    </div>

                    <h3
                      className={`font-bold text-lg sm:text-2xl mb-2 sm:mb-3 pr-12 sm:pr-16 leading-tight ${
                        completed ? "line-through" : ""
                      }`}
                    >
                      {session.unit}
                    </h3>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className={`text-sm sm:text-lg opacity-90 ${completed ? "line-through" : ""}`}>
                        {session.teacher}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : selectedIsHoliday ? (
            <div className="text-center text-orange-600 dark:text-orange-400 py-12 sm:py-16 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950">
              <Sun className="mx-auto mb-3 sm:mb-4 h-12 w-12 sm:h-16 sm:w-16 opacity-60" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {selectedEntry?.label ? selectedEntry.label : "Holiday - Rest Day"}
              </h3>
              <p className="text-base sm:text-lg">Time to relax and recharge! 🌴☀️</p>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12 sm:py-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
              <BookOpen className="mx-auto mb-3 sm:mb-4 h-12 w-12 sm:h-16 sm:w-16 opacity-30" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">No Classes Scheduled</h3>
              <p className="text-base sm:text-lg">Perfect day for self-study! 📚✨</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
