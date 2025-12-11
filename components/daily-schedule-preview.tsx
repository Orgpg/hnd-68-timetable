"use client";

import type { ClassSession, DayOfWeek } from "@/lib/timetable/data";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, BookOpen, Calendar, Home, Sun, Zap } from "lucide-react";
import {
  getDayName,
  getUnitIcon,
  isHoliday,
  isSessionCompleted as isSessionCompletedWeekBased,
  formatSessionTime,
  parseTime,
  getMyanmarDate,
} from "@/lib/utils/date-utils";
import { getTeacherImage } from "@/lib/utils/teacher-images";
import Image from "next/image";

interface DailySchedulePreviewProps {
  day: DayOfWeek;
  sessions: ClassSession[];
  label: string;
  isToday?: boolean;
  fullDate: string;
  // Optional: when provided, completion is checked against this exact calendar date.
  dateForSession?: Date;
  // Optional: special holiday note for this date (e.g., Thadinyut Holiday)
  holidayNote?: string;
}

// Completion helper for a specific date
function isSessionCompletedAtDate(
  session: ClassSession,
  dateAtYGN: Date
): boolean {
  const now = getMyanmarDate();
  const timeRange = session.time.replace(/\s/g, "");
  const [_, endStr] = timeRange.split("-");
  const end = parseTime(endStr, dateAtYGN);
  return now.getTime() > end.getTime();
}

// Enhanced unit colors for dark theme
function getEnhancedUnitColor(unit: string): string {
  if (unit.includes("Unit 1")) return "from-blue-500 to-blue-600";
  if (unit.includes("Unit 2")) return "from-emerald-500 to-green-600";
  if (unit.includes("Unit 3")) return "from-purple-500 to-violet-600";
  if (unit.includes("Unit 4")) return "from-orange-500 to-red-500";
  return "from-gray-500 to-gray-600";
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
  const computedWeekendHoliday = isHoliday(day);
  const holidayText = holidayNote
    ? holidayNote
    : computedWeekendHoliday
    ? "Holiday"
    : undefined;
  const isHolidayDay = Boolean(holidayText);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${
        isToday
          ? "bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 border-blue-400/50 shadow-2xl shadow-blue-500/20"
          : isHolidayDay
          ? "bg-gradient-to-br from-slate-800 via-orange-900 to-slate-800 border-orange-400/30 shadow-xl shadow-orange-500/10"
          : "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border-slate-600/30 shadow-xl hover:shadow-2xl"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-lg"></div>
      </div>

      {/* Header */}
      <CardHeader className="relative p-5 z-10 pb-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                isToday
                  ? "bg-blue-500/20"
                  : isHolidayDay
                  ? "bg-orange-500/20"
                  : "bg-slate-600/20"
              } backdrop-blur-sm`}
            >
              {isHolidayDay ? (
                <Home className="h-5 w-5 text-orange-400" />
              ) : (
                <Calendar className="h-5 w-5 text-cyan-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">{label}</h3>
              <p className="text-sm text-gray-300">{getDayName(day)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              {fullDate}
            </span>
            {isToday && (
              <div className="flex items-center gap-1 bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full backdrop-blur-sm animate-pulse">
                <Zap className="h-3 w-3" />
                Live
              </div>
            )}
            {isHolidayDay && (
              <span className="bg-orange-500/20 text-orange-300 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                {holidayText}
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="relative z-10 p-6">
        {sessions.length === 0 && isHolidayDay ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Sun className="h-8 w-8 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-orange-300 mb-2">
              Holiday - Rest Day
            </h3>
            <p className="text-orange-200/70">Enjoy your weekend! 🌴</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">
              No Classes Today
            </h3>
            <p className="text-slate-400">Perfect day for self-study! 📚</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => {
              const completed = dateForSession
                ? isSessionCompletedAtDate(session, dateForSession)
                : isSessionCompletedWeekBased(session, day);
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden bg-gradient-to-r ${getEnhancedUnitColor(
                    session.unit
                  )} p-5 rounded-2xl shadow-lg transition-all duration-300 ${
                    completed
                      ? "opacity-60 grayscale-[50%]"
                      : "hover:shadow-xl hover:scale-[1.02]"
                  }`}
                >
                  {/* Session background decoration */}
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-2 right-2 text-3xl opacity-20">
                    {getUnitIcon(session.unit)}
                  </div>

                  <div className="relative z-10">
                    {/* Time badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-white/90" />
                        <span
                          className={`font-bold text-sm text-white ${
                            completed ? "line-through" : ""
                          }`}
                        >
                          {formatSessionTime(session.time)}
                        </span>
                      </div>
                    </div>

                    {/* Unit title */}
                    <h4
                      className={`font-bold text-lg mb-3 pr-8 leading-tight text-white ${
                        completed ? "line-through" : ""
                      }`}
                    >
                      {session.unit}
                    </h4>

                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 bg-black/20 backdrop-blur-sm flex-shrink-0">
                        <Image
                          src={
                            getTeacherImage(session.teacher) ||
                            "/placeholder.svg"
                          }
                          alt={session.teacher}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span
                        className={`text-sm text-white/90 ${
                          completed ? "line-through" : ""
                        }`}
                      >
                        {session.teacher}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </div>
  );
}
