"use client"

import type { ClassSession, DayOfWeek } from "@/lib/timetable/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen, Calendar, GraduationCap, Home, Sun } from 'lucide-react'
import {
  getDayName,
  getUnitColor,
  getUnitIcon,
  isHoliday,
  isSessionCompleted as isSessionCompletedWeekBased,
  formatSessionTime,
  parseTime,
  getMyanmarDate,
} from "@/lib/utils/date-utils"

interface DailySchedulePreviewProps {
  day: DayOfWeek
  sessions: ClassSession[]
  label: string
  isToday?: boolean
  fullDate: string
  // Optional: when provided, completion is checked against this exact calendar date.
  dateForSession?: Date
  // Optional: special holiday note for this date (e.g., Thadinyut Holiday)
  holidayNote?: string
}

// Completion helper for a specific date
function isSessionCompletedAtDate(session: ClassSession, dateAtYGN: Date): boolean {
  const now = getMyanmarDate()
  const timeRange = session.time.replace(/\s/g, "")
  const [_, endStr] = timeRange.split("-")
  const end = parseTime(endStr, dateAtYGN)
  return now.getTime() > end.getTime()
}

export function DailySchedulePreview({
  day,
  sessions,
  label,
  isToday = false,
  fullDate,
  dateForSession,
  holidayNote,
}: DailySchedulePreviewProps) {
  const computedWeekendHoliday = isHoliday(day)
  const holidayText = holidayNote ? holidayNote : computedWeekendHoliday ? "Holiday" : undefined
  const isHolidayDay = Boolean(holidayText)

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg border-none ${
        isToday
          ? "bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl ring-2 ring-blue-400 dark:from-blue-950 dark:to-cyan-950 dark:ring-blue-600"
          : isHolidayDay
            ? "bg-gradient-to-br from-orange-50 to-amber-50 shadow-md hover:from-orange-100 dark:from-orange-950 dark:to-amber-950 dark:hover:from-orange-900"
            : "bg-gradient-to-br from-white to-gray-50 shadow-md hover:from-gray-100 dark:from-gray-900 dark:to-gray-950 dark:hover:from-gray-800"
      }`}
    >
      <CardHeader className="pb-3 bg-white/50 backdrop-blur-sm border-b border-gray-100 dark:bg-gray-900/50 dark:border-gray-800">
        <CardTitle
          className={`text-base sm:text-lg flex flex-col sm:flex-row items-start sm:items-center gap-2 ${
            isToday
              ? "text-blue-700 dark:text-blue-400"
              : isHolidayDay
                ? "text-orange-700 dark:text-orange-400"
                : "text-gray-700 dark:text-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {isHolidayDay ? <Home className="h-4 w-4 sm:h-5 sm:w-5" /> : <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />}
            {label}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs sm:text-sm font-normal bg-white/70 px-2 py-1 rounded-full dark:bg-gray-800/70 dark:text-gray-200">
              {getDayName(day)}
            </span>
            <span className="text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">{fullDate}</span>
            {isToday && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">Live</span>}
            {isHolidayDay && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{holidayText}</span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        {sessions.length === 0 && isHolidayDay ? (
          <div className="text-center text-orange-600 dark:text-orange-400 py-6 sm:py-8">
            <Sun className="mx-auto mb-2 sm:mb-3 h-8 w-8 sm:h-12 sm:w-12 opacity-60" />
            <h3 className="font-semibold mb-1 text-sm sm:text-base">Holiday - Rest Day</h3>
            <p className="text-xs sm:text-sm">Enjoy your weekend! 🌴</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-6 sm:py-8">
            <BookOpen className="mx-auto mb-2 sm:mb-3 h-8 w-8 sm:h-12 sm:w-12 opacity-30" />
            <h3 className="font-semibold mb-1 text-sm sm:text-base">No Classes Today</h3>
            <p className="text-xs sm:text-sm">Free day! 🎉</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {sessions.map((session, index) => {
              const completed = dateForSession
                ? isSessionCompletedAtDate(session, dateForSession)
                : isSessionCompletedWeekBased(session, day)
              return (
                <div
                  key={index}
                  className={`relative overflow-hidden bg-gradient-to-r ${getUnitColor(session.unit)} p-3 sm:p-4 rounded-xl text-white shadow-md transition-all duration-300 ${
                    completed ? "opacity-60 grayscale-[50%]" : "hover:shadow-lg hover:scale-[1.02]"
                  }`}
                >
                  <div className="absolute top-2 right-2 text-lg sm:text-2xl opacity-70">{getUnitIcon(session.unit)}</div>

                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-3 w-3 sm:h-4 w-4" />
                    <span
                      className={`font-bold text-xs sm:text-sm bg-white/20 px-2 py-1 rounded-full ${
                        completed ? "line-through" : ""
                      }`}
                    >
                      {formatSessionTime(session.time)}
                    </span>
                  </div>

                  <h4 className={`font-bold text-xs sm:text-sm mb-2 pr-6 sm:pr-8 leading-tight ${completed ? "line-through" : ""}`}>
                    {session.unit}
                  </h4>

                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-3 w-3 sm:h-4 w-4" />
                    <span className={`text-xs opacity-90 truncate ${completed ? "line-through" : ""}`}>{session.teacher}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
