"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import {
  Sparkles,
  CalendarRange,
  BadgeCheck,
  ClockIcon,
  Sun,
  Filter,
  Search,
  Target,
  ArrowUp,
} from "lucide-react";
import { getModule2DailyEntriesSorted, type DailyEntry } from "@/lib/timetable";
import {
  formatSessionTime,
  getMyanmarDate,
  getDayName,
  getUnitColor,
  isSessionCompletedAtDate,
  ymdKey, // Add ymdKey here
} from "@/lib/utils/date-utils";
import type { ClassSession } from "@/lib/timetable/data";

// ---------- Helpers ----------
type WeekGroup = {
  weekKey: string; // YYYY-MM-DD (Mon of the week)
  startDate: Date;
  endDate: Date;
  entries: DailyEntry[];
};

function ymdToDate(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function startOfWeekMonday(d: Date): Date {
  const x = new Date(d);
  const day = x.getDay(); // 0 Sun ... 6 Sat
  const diff = day === 0 ? -6 : 1 - day;
  x.setDate(x.getDate() + diff);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function fmtDateRangeYGN(start: Date, end: Date): string {
  const fmt = (dt: Date) =>
    dt.toLocaleDateString("en-US", {
      timeZone: "Asia/Yangon",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  return `${fmt(start)} – ${fmt(end)}`;
}
function groupByWeek(entries: DailyEntry[]): WeekGroup[] {
  if (entries.length === 0) return [];
  const byDate = new Map(entries.map((e) => [e.date, e]));
  const first = ymdToDate(entries[0].date);
  const last = ymdToDate(entries[entries.length - 1].date);
  let cursor = startOfWeekMonday(first);
  const stop = addDays(startOfWeekMonday(last), 6);
  const weeks: WeekGroup[] = [];
  while (cursor <= stop) {
    const start = new Date(cursor);
    const end = addDays(start, 6);
    const list: DailyEntry[] = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(start, i);
      const k = ymdKey(d);
      const entry = byDate.get(k);
      if (entry) list.push(entry);
    }
    if (list.length > 0) {
      weeks.push({
        weekKey: ymdKey(start),
        startDate: start,
        endDate: end,
        entries: list,
      });
    }
    cursor = addDays(cursor, 7);
  }
  return weeks;
}
function unitChipColor(unit: string): string {
  if (unit.includes("Unit 1"))
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
  if (unit.includes("Unit 2"))
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (unit.includes("Unit 3"))
    return "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300";
  if (unit.includes("Unit 4"))
    return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
  return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
}

function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday (1) to Friday (5)
}

// ---------- Page ----------
type StatusFilter = "all" | "upcoming" | "completed";

export default function SchedulePage() {
  // Data
  const all = useMemo(() => getModule2DailyEntriesSorted(), []);
  const weeks = useMemo(() => groupByWeek(all), [all]);

  // Live tick for status updates
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 30000);
    return () => clearInterval(t);
  }, []);

  // Filters
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [hideHolidays, setHideHolidays] = useState(false);

  // Scroll to current week
  const weekRefs = useRef<Record<string, HTMLElement | null>>({});
  const nowYGN = getMyanmarDate();
  const currentWeekKey = useMemo(
    () => ymdKey(startOfWeekMonday(nowYGN)),
    [nowYGN]
  );

  const jumpToCurrentWeek = () => {
    const el = weekRefs.current[currentWeekKey];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Toolbar sticky at top within page
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black flex flex-col">
      <Header />

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 space-y-6 sm:space-y-8">
          {/* Hero */}
          <div className="text-center">
            <Sparkles className="mx-auto h-12 w-12 sm:h-14 sm:w-14 text-teal-600 dark:text-teal-400 mb-2" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              Schedule Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Weekly timetable with live status in Myanmar time.
            </p>
          </div>

          {/* Filters */}
          <Card className="sticky top-16 z-30 border-none shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by unit or teacher..."
                    className="pl-9"
                    aria-label="Search"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant={status === "all" ? "default" : "outline"}
                      onClick={() => setStatus("all")}
                      className={
                        status === "all" ? "bg-teal-600 text-white" : ""
                      }
                    >
                      All
                    </Button>
                    <Button
                      size="sm"
                      variant={status === "upcoming" ? "default" : "outline"}
                      onClick={() => setStatus("upcoming")}
                      className={
                        status === "upcoming" ? "bg-emerald-600 text-white" : ""
                      }
                    >
                      Upcoming
                    </Button>
                    <Button
                      size="sm"
                      variant={status === "completed" ? "default" : "outline"}
                      onClick={() => setStatus("completed")}
                      className={
                        status === "completed" ? "bg-slate-700 text-white" : ""
                      }
                    >
                      Completed
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-start gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="hide-holidays"
                      checked={hideHolidays}
                      onCheckedChange={setHideHolidays}
                    />
                    <Label
                      htmlFor="hide-holidays"
                      className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      Hide holidays
                    </Label>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={jumpToCurrentWeek}
                    className="gap-2 bg-transparent"
                  >
                    <Target className="h-4 w-4" />
                    This week
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weeks */}
          <div className="space-y-10">
            {weeks.map((week) => {
              // Build flat rows for filtering
              type Row = {
                key: string;
                date: Date;
                dateLabel: string;
                dayCode: string;
                session?: ClassSession;
                isHoliday: boolean;
                completed?: boolean;
                holidayText?: string;
              };

              const daySpan = Array.from({ length: 7 }, (_, i) =>
                addDays(week.startDate, i)
              );
              const entryByDate = new Map(week.entries.map((e) => [e.date, e]));
              const rows: Row[] = [];

              daySpan.forEach((date) => {
                const dateKey = ymdKey(date);
                const entry = entryByDate.get(dateKey);
                if (!entry) return;

                const dateLabel = date.toLocaleDateString("en-US", {
                  timeZone: "Asia/Yangon",
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                if (!entry.sessions || entry.sessions.length === 0) {
                  rows.push({
                    key: `${dateKey}_holiday`,
                    date,
                    dateLabel,
                    dayCode: entry.dayCode,
                    isHoliday: true,
                    holidayText: entry.label ?? "Holiday",
                  });
                } else {
                  (entry.sessions as ClassSession[]).forEach((s, idx) => {
                    rows.push({
                      key: `${dateKey}_${idx}`,
                      date,
                      dateLabel,
                      dayCode: entry.dayCode,
                      session: s,
                      isHoliday: false,
                      completed: isSessionCompletedAtDate(s, date),
                    });
                  });
                }
              });

              // Apply filters
              const filtered = rows.filter((r) => {
                if (hideHolidays && r.isHoliday) return false;
                if (query) {
                  const q = query.toLowerCase();
                  const hay = r.session
                    ? `${r.session.unit} ${r.session.teacher}`.toLowerCase()
                    : (r.holidayText ?? "").toLowerCase();
                  if (!hay.includes(q)) return false;
                }
                if (status === "upcoming" && r.session && r.completed)
                  return false;
                if (status === "completed" && r.session && !r.completed)
                  return false;
                // Holidays pass only if status is "all"
                if (
                  (status === "upcoming" || status === "completed") &&
                  r.isHoliday
                )
                  return false;
                return true;
              });

              // Counts for header
              const totalSessions = rows.filter((r) => r.session).length;
              const completedCount = rows.filter(
                (r) => r.session && r.completed
              ).length;
              const upcomingCount = totalSessions - completedCount;
              const holidayCount = rows.filter((r) => r.isHoliday).length;

              return (
                <section
                  key={week.weekKey}
                  ref={(el) => {
                    weekRefs.current[week.weekKey] = el;
                  }}
                  className="scroll-mt-24"
                >
                  {/* Week header */}
                  <div className="sticky top-[8.5rem] z-20 mb-3">
                    <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                      <CardHeader className="py-4 px-5">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <CalendarRange className="h-5 w-5 opacity-90" />
                            <CardTitle className="text-lg sm:text-xl font-semibold">
                              {fmtDateRangeYGN(week.startDate, week.endDate)}
                            </CardTitle>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-white/20 text-white"
                            >
                              <ClockIcon className="h-3.5 w-3.5 mr-1" />
                              {upcomingCount} upcoming
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="bg-white/20 text-white"
                            >
                              <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                              {completedCount} completed
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="bg-white/20 text-white"
                            >
                              <Sun className="h-3.5 w-3.5 mr-1" />
                              {holidayCount} holidays
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Mobile cards */}
                  <div className="md:hidden space-y-3">
                    {filtered.length === 0 ? (
                      <Card className="border-dashed border-2">
                        <CardContent className="py-6 text-center text-gray-500 dark:text-gray-400">
                          No items for current filters.
                        </CardContent>
                      </Card>
                    ) : (
                      filtered.map((r) =>
                        r.isHoliday ? (
                          <Card
                            key={r.key}
                            className="bg-orange-50/70 dark:bg-orange-900/20 border-none"
                          >
                            <CardContent className="py-3 px-4 flex items-center justify-between">
                              <div>
                                <div className="text-sm font-semibold">
                                  {r.dateLabel}
                                </div>
                                <div className="text-xs text-orange-700 dark:text-orange-300">
                                  {r.holidayText}
                                </div>
                              </div>
                              <Badge className="bg-orange-500 text-white">
                                Holiday
                              </Badge>
                            </CardContent>
                          </Card>
                        ) : (
                          <Card
                            key={r.key}
                            className={`border-none shadow-md overflow-hidden relative ${
                              r.completed ? "opacity-60" : ""
                            }`}
                          >
                            <div
                              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${getUnitColor(
                                r.session!.unit
                              )}`}
                            />
                            <CardContent className="py-3 px-4 space-y-1.5">
                              <div className="text-sm font-semibold">
                                {r.dateLabel}
                              </div>
                              <div className="text-xs text-gray-500">
                                {getDayName(r.dayCode as any)}
                              </div>
                              <div className="text-sm font-semibold">
                                {formatSessionTime(r.session!.time)}
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                  className={unitChipColor(r.session!.unit)}
                                >
                                  {r.session!.unit}
                                </Badge>
                                <span className="text-xs text-gray-600 dark:text-gray-300">
                                  {r.session!.teacher}
                                </span>
                              </div>
                              <div className="pt-1">
                                {r.completed ? (
                                  <Badge
                                    variant="secondary"
                                    className="bg-gray-200 dark:bg-gray-800"
                                  >
                                    <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                                    Completed
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="secondary"
                                    className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                  >
                                    <ClockIcon className="h-3.5 w-3.5 mr-1" />
                                    Upcoming
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )
                    )}
                  </div>

                  {/* Desktop table */}
                  <div className="hidden md:block">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardContent className="p-5">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableBody>
                              {filtered.length === 0 ? (
                                <TableRow>
                                  <TableCell
                                    colSpan={6}
                                    className="text-center py-8 text-gray-500 dark:text-gray-400"
                                  >
                                    No items for current filters.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                filtered.map((r) =>
                                  r.isHoliday ? (
                                    <TableRow
                                      key={r.key}
                                      className="bg-orange-50/60 dark:bg-orange-950/20"
                                    >
                                      <TableCell className="font-medium">
                                        {r.dateLabel}
                                      </TableCell>
                                      <TableCell>{r.dayCode}</TableCell>
                                      <TableCell>—</TableCell>
                                      <TableCell className="text-orange-700 dark:text-orange-300">
                                        {r.holidayText}
                                      </TableCell>
                                      <TableCell>—</TableCell>
                                      <TableCell className="text-right">
                                        <span className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300">
                                          <Sun className="h-4 w-4" /> Holiday
                                        </span>
                                      </TableCell>
                                    </TableRow>
                                  ) : (
                                    <TableRow
                                      key={r.key}
                                      className={
                                        r.completed ? "opacity-60" : ""
                                      }
                                    >
                                      <TableCell className="font-medium">
                                        {r.dateLabel}
                                      </TableCell>
                                      <TableCell>{r.dayCode}</TableCell>
                                      <TableCell className="whitespace-nowrap">
                                        {formatSessionTime(r.session!.time)}
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-2">
                                          <Badge
                                            className={unitChipColor(
                                              r.session!.unit
                                            )}
                                          >
                                            {r.session!.unit}
                                          </Badge>
                                          <span
                                            className={`${
                                              r.completed ? "line-through" : ""
                                            }`}
                                          >
                                            {r.session!.unit.replace(
                                              /^Unit \d+\s+-\s+/,
                                              ""
                                            )}
                                          </span>
                                        </div>
                                      </TableCell>
                                      <TableCell
                                        className={`${
                                          r.completed ? "line-through" : ""
                                        }`}
                                      >
                                        {r.session!.teacher}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        {r.completed ? (
                                          <span className="inline-flex items-center gap-1 text-gray-700 dark:text-gray-300">
                                            <BadgeCheck className="h-4 w-4" />{" "}
                                            Completed
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                                            <ClockIcon className="h-4 w-4" />{" "}
                                            Upcoming
                                          </span>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-4 w-4 mr-1" />
              Back to top
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
