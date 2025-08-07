"use client";

import { useState, useEffect } from "react";
import { timetable, type DayOfWeek } from "@/lib/timetable/data";
import {
  getCurrentDay,
  getTomorrowDay,
  getDayName,
  getUnitColor,
  getUnitIcon,
  isHoliday,
  isSessionCompleted,
  formatSessionTime,
  getMyanmarDate, // Import getMyanmarDate
  formatDate, // Import formatDate
  getDateForDay, // Import getDateForDay
} from "@/lib/utils/date-utils";
import { DailySchedulePreview } from "./daily-schedule-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  GraduationCap,
  Sparkles,
  Calendar,
  Home,
  Sun,
} from "lucide-react";

const DAYS: DayOfWeek[] = ["MON", "TUE", "WED", "THURS", "FRI", "SAT", "SUN"];

export function DailyTimetableView() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [currentDay, setCurrentDay] = useState<DayOfWeek>(getCurrentDay());
  const [tomorrowDay, setTomorrowDay] = useState<DayOfWeek>(getTomorrowDay());
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);

  const [currentDayFullDate, setCurrentDayFullDate] = useState("");
  const [tomorrowDayFullDate, setTomorrowDayFullDate] = useState("");
  const [selectedDayFullDate, setSelectedDayFullDate] = useState("");

  useEffect(() => {
    const today = getCurrentDay();
    const tomorrow = getTomorrowDay();
    setCurrentDay(today);
    setTomorrowDay(tomorrow);

    const todayDate = getMyanmarDate();
    setCurrentDayFullDate(formatDate(todayDate));

    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(todayDate.getDate() + 1);
    setTomorrowDayFullDate(formatDate(tomorrowDate));

    const todayIndex = DAYS.indexOf(today);
    if (todayIndex !== -1) {
      setSelectedDayIndex(todayIndex);
      setSelectedDayFullDate(formatDate(getDateForDay(DAYS[todayIndex])));
    }
  }, []);

  useEffect(() => {
    setSelectedDayFullDate(formatDate(getDateForDay(DAYS[selectedDayIndex])));
  }, [selectedDayIndex]);

  const currentPeriod = timetable[currentPeriodIndex];
  const selectedDay = DAYS[selectedDayIndex];
  const selectedSchedule = currentPeriod.schedule[selectedDay] || [];

  const todaySchedule = currentPeriod.schedule[currentDay] || [];
  const tomorrowSchedule = currentPeriod.schedule[tomorrowDay] || [];

  const nextDay = () => {
    setSelectedDayIndex((prev) => (prev + 1) % DAYS.length);
  };

  const prevDay = () => {
    setSelectedDayIndex((prev) => (prev - 1 + DAYS.length) % DAYS.length);
  };

  const nextPeriod = () => {
    setCurrentPeriodIndex((prev) => (prev + 1) % timetable.length);
  };

  const prevPeriod = () => {
    setCurrentPeriodIndex(
      (prev) => (prev - 1 + timetable.length) % timetable.length
    );
  };

  const isSelectedDayHoliday = isHoliday(selectedDay);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Period Selector */}
      <Card
        className="bg-gradient-to-r from-white to-gray-50 border-none shadow-lg
      dark:from-gray-900 dark:to-gray-950"
      >
        {" "}
        {/* Dark mode for period selector card */}
        <CardHeader className="p-4 sm:p-6 flex flex-col items-center justify-center text-center">
          <CardTitle className="text-lg sm:text-xl mb-1 flex flex-col sm:flex-row items-center gap-2 text-gray-800 dark:text-gray-200">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
            <span className="hidden sm:inline">HND 68 Timetable</span>
            <span className="sm:hidden">HND 68</span>
          </CardTitle>
          <p
            className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full inline-block
            dark:text-gray-400 dark:bg-gray-800"
          >
            {currentPeriod.period}
          </p>
        </CardHeader>
      </Card>

      {/* Today & Tomorrow Preview */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        id="today"
      >
        <DailySchedulePreview
          day={currentDay}
          sessions={todaySchedule}
          label="Today's Schedule"
          isToday={true}
          fullDate={currentDayFullDate}
        />
        <DailySchedulePreview
          day={tomorrowDay}
          sessions={tomorrowSchedule}
          label="Tomorrow's Schedule"
          fullDate={tomorrowDayFullDate}
        />
      </div>

      {/* Day Navigator */}
      <Card
        className={`border-none shadow-lg ${
          isSelectedDayHoliday
            ? "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950"
            : "bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950"
        }`} // Dark mode for day navigator card
        id="schedule"
      >
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevDay}
              size="sm"
              className="rounded-full bg-white/70 hover:bg-white border-gray-200
              dark:bg-gray-800/70 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-300" // Dark mode for buttons
            >
              <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Button>
            <CardTitle className="text-lg sm:text-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center">
              {isSelectedDayHoliday ? (
                <Home className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              ) : (
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
              )}
              <span
                className={`bg-gradient-to-r ${
                  isSelectedDayHoliday
                    ? "from-orange-600 to-amber-600"
                    : "from-teal-600 to-cyan-600"
                } bg-clip-text text-transparent`}
              >
                {selectedDay} - {getDayName(selectedDay)}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedDayFullDate}
              </span>
              {isSelectedDayHoliday && (
                <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  Holiday
                </span>
              )}
            </CardTitle>
            <Button
              variant="outline"
              onClick={nextDay}
              size="sm"
              className="rounded-full bg-white/70 hover:bg-white border-gray-200
              dark:bg-gray-800/70 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-300" // Dark mode for buttons
            >
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Selected Day Detail */}
      <Card className="overflow-hidden shadow-xl border-none">
        <CardContent className="p-0">
          {selectedSchedule.length > 0 ? (
            <div className="space-y-0">
              {selectedSchedule.map((session, index) => {
                const isCompleted = isSessionCompleted(session, selectedDay);
                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden bg-gradient-to-r ${getUnitColor(
                      session.unit
                    )} p-4 sm:p-6 text-white ${
                      index === 0 ? "rounded-t-lg" : ""
                    } ${
                      index === selectedSchedule.length - 1
                        ? "rounded-b-lg"
                        : ""
                    } transition-all duration-300 ${
                      isCompleted
                        ? "opacity-60 grayscale-[50%]"
                        : "hover:shadow-lg"
                    }`}
                  >
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-2xl sm:text-4xl opacity-30">
                      {getUnitIcon(session.unit)}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Clock className="h-4 w-4 sm:h-6 sm:w-6" />
                      <span
                        className={`font-bold text-base sm:text-xl bg-white/20 px-3 sm:px-4 py-1 sm:py-2 rounded-full ${
                          isCompleted ? "line-through" : ""
                        }`}
                      >
                        {formatSessionTime(session.time)}
                      </span>
                    </div>

                    <h3
                      className={`font-bold text-lg sm:text-2xl mb-2 sm:mb-3 pr-12 sm:pr-16 leading-tight ${
                        isCompleted ? "line-through" : ""
                      }`}
                    >
                      {session.unit}
                    </h3>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span
                        className={`text-sm sm:text-lg opacity-90 ${
                          isCompleted ? "line-through" : ""
                        }`}
                      >
                        {session.teacher}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : isSelectedDayHoliday ? (
            <div className="text-center text-orange-600 dark:text-orange-400 py-12 sm:py-16 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950">
              {" "}
              {/* Dark mode for holiday message */}
              <Sun className="mx-auto mb-3 sm:mb-4 h-12 w-12 sm:h-16 sm:w-16 opacity-60" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Holiday - Rest Day
              </h3>
              <p className="text-base sm:text-lg">
                Time to relax and recharge! 🌴☀️
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12 sm:py-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
              {" "}
              {/* Dark mode for no classes message */}
              <BookOpen className="mx-auto mb-3 sm:mb-4 h-12 w-12 sm:h-16 sm:w-16 opacity-30" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                No Classes Scheduled
              </h3>
              <p className="text-base sm:text-lg">
                Perfect day for self-study! 📚✨
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Week Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
        {DAYS.map((day, index) => {
          const daySchedule = currentPeriod.schedule[day] || [];
          const isSelected = index === selectedDayIndex;
          const isCurrentDay = day === currentDay;
          const hasClasses = daySchedule.length > 0;
          const isHolidayDay = isHoliday(day);

          return (
            <Button
              key={day}
              variant={isSelected ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedDayIndex(index)}
              className={`h-16 sm:h-20 transition-all duration-300 border-none rounded-xl shadow-sm ${
                isCurrentDay
                  ? "ring-2 ring-blue-400 ring-offset-2 dark:ring-blue-600 dark:ring-offset-gray-950"
                  : "" // Dark mode for today ring
              } ${
                isHolidayDay
                  ? "bg-gradient-to-br from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 text-orange-800 dark:from-orange-900 dark:to-amber-900 dark:hover:from-orange-800 dark:hover:to-amber-800 dark:text-orange-300" // Dark mode for holiday button
                  : hasClasses
                  ? "bg-gradient-to-br from-teal-100 to-emerald-100 hover:from-teal-200 hover:to-emerald-200 text-teal-800 dark:from-teal-900 dark:to-emerald-900 dark:hover:from-teal-800 dark:hover:to-emerald-800 dark:text-teal-300" // Dark mode for classes button
                  : "bg-gradient-to-br from-gray-100 to-slate-100 text-gray-700 dark:from-gray-800 dark:to-slate-800 dark:text-gray-300" // Dark mode for no classes button
              } ${
                isSelected
                  ? "shadow-lg scale-105 ring-2 ring-teal-400 dark:ring-teal-600"
                  : "hover:scale-[1.02]"
              }`} // Dark mode for selected button ring
            >
              <div className="text-center">
                <div className="font-bold text-sm sm:text-lg">{day}</div>
                <div className="text-xs flex items-center justify-center gap-1">
                  {isHolidayDay ? (
                    <Home className="h-2 w-2 sm:h-3 w-3" />
                  ) : (
                    <BookOpen className="h-2 w-2 sm:h-3 w-3" />
                  )}
                  {isHolidayDay ? "Holiday" : `${daySchedule.length} classes`}
                </div>
                {isCurrentDay && (
                  <div className="text-xs bg-blue-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full mt-1">
                    Today
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
