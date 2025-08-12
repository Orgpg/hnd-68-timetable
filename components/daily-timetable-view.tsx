"use client";

import { useMemo, useState } from "react";
import type { DayOfWeek, ClassSession } from "@/lib/timetable/data";
import {
  getMyanmarDate,
  formatDate,
  formatSessionTime,
  getUnitIcon,
  getDayName,
  isHoliday,
  parseTime,
} from "@/lib/utils/date-utils";
import { DailySchedulePreview } from "./daily-schedule-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  GraduationCap,
  Home,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import {
  getDailyEntryByDate,
  ygnDateKey,
  getPeriodLabelFor,
} from "@/lib/timetable";

// Helper to add days
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

// Enhanced unit colors for dark theme
function getEnhancedUnitColor(unit: string): string {
  if (unit.includes("Unit 1")) return "from-blue-500 to-blue-600";
  if (unit.includes("Unit 2")) return "from-emerald-500 to-green-600";
  if (unit.includes("Unit 3")) return "from-purple-500 to-violet-600";
  if (unit.includes("Unit 4")) return "from-orange-500 to-red-500";
  return "from-gray-500 to-gray-600";
}

// Determines if a class session for a specific calendar date is already completed
function isSessionCompletedAtDateLocal(
  session: ClassSession,
  dateAtYGN: Date
): boolean {
  const now = getMyanmarDate();
  const timeRange = session.time.replace(/\s/g, "");
  const [_, endStr] = timeRange.split("-");
  const end = parseTime(endStr, dateAtYGN);
  return now.getTime() > end.getTime();
}

export function DailyTimetableView() {
  // Anchor everything to Myanmar time
  const todayYGN = useMemo(() => getMyanmarDate(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(todayYGN);

  // Today / Tomorrow entries
  const todayEntry = useMemo(() => getDailyEntryByDate(todayYGN), [todayYGN]);
  const tomorrowEntry = useMemo(
    () => getDailyEntryByDate(addDays(todayYGN, 1)),
    [todayYGN]
  );

  const todayFullDate = useMemo(() => formatDate(todayYGN), [todayYGN]);
  const tomorrowFullDate = useMemo(
    () => formatDate(addDays(todayYGN, 1)),
    [todayYGN]
  );

  // Selected day entry
  const selectedEntry = useMemo(
    () => getDailyEntryByDate(selectedDate),
    [selectedDate]
  );
  const selectedFullDate = useMemo(
    () => formatDate(selectedDate),
    [selectedDate]
  );

  const periodLabel = useMemo(
    () => getPeriodLabelFor(ygnDateKey(selectedDate)),
    [selectedDate]
  );

  // Handlers for arrow navigation
  const prevDay = () => setSelectedDate((d) => addDays(d, -1));
  const nextDay = () => setSelectedDate((d) => addDays(d, 1));

  const selectedIsHoliday = selectedEntry
    ? isHoliday(selectedEntry.dayCode as DayOfWeek) ||
      Boolean(selectedEntry.label)
    : false;

  return (
    <div className="space-y-8">
      {/* Period Label */}
      <Card className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-slate-600/30 shadow-xl">
        <CardHeader className="p-6 flex flex-col items-center justify-center text-center">
          <CardTitle className="text-xl mb-2 flex flex-col sm:flex-row items-center gap-3 text-white">
            <div className="p-2 bg-teal-500/20 rounded-xl backdrop-blur-sm">
              <Calendar className="h-6 w-6 text-teal-400" />
            </div>
            <span>HND 68 Timetable</span>
          </CardTitle>
          <p className="text-sm text-gray-300 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
            {periodLabel}
          </p>
        </CardHeader>
      </Card>

      {/* Today & Tomorrow Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="today">
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

      {/* Day Navigator */}
      <div
        className={`relative overflow-hidden rounded-3xl border shadow-2xl ${
          selectedIsHoliday
            ? "bg-gradient-to-r from-slate-800 via-orange-900 to-slate-800 border-orange-400/30"
            : "bg-gradient-to-r from-slate-800 via-teal-900 to-slate-800 border-teal-400/30"
        }`}
        id="schedule"
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>
        </div>

        <CardHeader className="relative z-10 p-6 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevDay}
              size="sm"
              className="rounded-full bg-black/30 hover:bg-black/50 border-white/20 text-white backdrop-blur-sm"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <CardTitle className="flex flex-col sm:flex-row items-center gap-3 text-center text-white">
              <div
                className={`p-2 rounded-xl backdrop-blur-sm ${
                  selectedIsHoliday ? "bg-orange-500/20" : "bg-teal-500/20"
                }`}
              >
                {selectedIsHoliday ? (
                  <Home className="h-6 w-6 text-orange-400" />
                ) : (
                  <Sparkles className="h-6 w-6 text-teal-400" />
                )}
              </div>
              <div>
                <div
                  className={`text-xl font-bold bg-gradient-to-r ${
                    selectedIsHoliday
                      ? "from-orange-400 to-red-400"
                      : "from-teal-400 to-cyan-400"
                  } bg-clip-text text-transparent`}
                >
                  {(selectedEntry?.dayCode ?? "MON") +
                    " - " +
                    getDayName((selectedEntry?.dayCode as DayOfWeek) ?? "MON")}
                </div>
                <div className="text-sm text-gray-300">{selectedFullDate}</div>
              </div>
              {selectedIsHoliday && (
                <span className="text-sm bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full backdrop-blur-sm">
                  {selectedEntry?.label ?? "Holiday"}
                </span>
              )}
            </CardTitle>

            <Button
              variant="outline"
              onClick={nextDay}
              size="sm"
              className="rounded-full bg-black/30 hover:bg-black/50 border-white/20 text-white backdrop-blur-sm"
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </div>

      {/* Selected Day Detail */}
      <Card className="overflow-hidden shadow-2xl border-none bg-gradient-to-br from-slate-800 to-slate-900">
        <CardContent className="p-5">
          {selectedEntry && selectedEntry.sessions.length > 0 ? (
            <div className="space-y-0">
              {selectedEntry.sessions.map((session, index) => {
                const completed = isSessionCompletedAtDateLocal(
                  session as ClassSession,
                  selectedDate
                );
                return (
                  <div
                    key={`${ygnDateKey(selectedDate)}_${index}`}
                    className={`relative overflow-hidden bg-gradient-to-r ${getEnhancedUnitColor(
                      session.unit
                    )} p-6 text-white ${index === 0 ? "rounded-t-lg" : ""} ${
                      index === selectedEntry.sessions.length - 1
                        ? "rounded-b-lg"
                        : ""
                    } transition-all duration-300 ${
                      completed
                        ? "opacity-60 grayscale-[50%]"
                        : "hover:shadow-lg"
                    }`}
                  >
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 right-4 text-4xl opacity-20">
                      {getUnitIcon(session.unit)}
                    </div>

                    <div className="relative z-10">
                      {/* Time badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <span
                            className={`font-bold text-lg ${
                              completed ? "line-through" : ""
                            }`}
                          >
                            {formatSessionTime(session.time)}
                          </span>
                        </div>
                        {completed && (
                          <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            <span className="text-xs">Completed</span>
                          </div>
                        )}
                      </div>

                      {/* Unit title */}
                      <h3
                        className={`font-bold text-2xl mb-4 pr-16 leading-tight ${
                          completed ? "line-through" : ""
                        }`}
                      >
                        {session.unit}
                      </h3>

                      {/* Teacher info */}
                      <div className="flex items-center gap-3">
                        <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <span
                          className={`text-lg opacity-90 ${
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
          ) : selectedIsHoliday ? (
            <div className="text-center py-16 bg-gradient-to-br from-orange-900/20 to-red-900/20">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <Sun className="h-10 w-10 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-orange-300">
                {selectedEntry?.label
                  ? selectedEntry.label
                  : "Holiday - Rest Day"}
              </h3>
              <p className="text-lg text-orange-200/70">
                Time to relax and recharge! 🌴☀️
              </p>
            </div>
          ) : (
            <div className="text-center py-16 bg-gradient-to-br from-slate-700/20 to-slate-800/20">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-300">
                No Classes Scheduled
              </h3>
              <p className="text-lg text-slate-400">
                Perfect day for self-study! 📚✨
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
