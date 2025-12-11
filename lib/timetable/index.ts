import { aug4_8_2025_daily, type DailyEntry as DailyEntryA } from "./aug-4-8-2025.ts"
import { aug11_sept26_2025_daily, type DailyEntry as DailyEntryB } from "./aug-11-sept-26-2025.ts"
import { septNov2025_daily, type DailyEntry as DailyEntryC } from "./sept-29-2025-to-nov-19-2025.ts"
import { module2_daily, type DailyEntry as DailyEntryD } from "./module2.ts"

export type DailyEntry = DailyEntryA | DailyEntryB | DailyEntryC | DailyEntryD

export const dailyPeriods = {
  "2025-08-04_to_2025-08-10": aug4_8_2025_daily,
  "2025-08-11_to_2025-09-28": aug11_sept26_2025_daily,
  "2025-09-29_to_2025-11-19": septNov2025_daily,
  module2_daily: module2_daily,
}

export function ygnDateKey(date: Date): string {
  return date
    .toLocaleString("en-CA", {
      timeZone: "Asia/Yangon",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .slice(0, 10)
}

// Get the correct array for a given YGN date key:
export function getPeriodArrayFor(key: string): DailyEntry[] {
  if (key >= "2025-08-04" && key <= "2025-08-10") return aug4_8_2025_daily
  if (key >= "2025-08-11" && key <= "2025-09-28") return aug11_sept26_2025_daily
  if (key >= "2025-09-29" && key <= "2025-11-19") return septNov2025_daily
  if (key >= "2025-12-15" && key <= "2026-01-04") return module2_daily
  // Fallback: closest known period
  if (key < "2025-08-11") return aug4_8_2025_daily
  if (key < "2025-09-29") return aug11_sept26_2025_daily
  if (key < "2025-12-15") return septNov2025_daily
  return module2_daily
}

export function getDailyEntryByDate(date: Date): DailyEntry | undefined {
  const key = ygnDateKey(date)
  const arr = getPeriodArrayFor(key)
  return arr.find((d) => d.date === key)
}

// Human label for date key within known ranges.
export function getPeriodLabelFor(key: string): string {
  if (key >= "2025-08-04" && key <= "2025-08-10") return "From 4-Aug-2025 to 8-Aug-2025"
  if (key >= "2025-08-11" && key <= "2025-09-28") return "From 11-Aug-2025 to 26-Sept-2025"
  if (key >= "2025-09-29" && key <= "2025-12-14") return "From 29-Sept-2025 to 14-Dec-2025"
  if (key >= "2025-12-15" && key <= "2026-04-24") return "From 15-Dec-2025 to 24-Apr-2026"
  // Fallbacks
  if (key < "2025-08-11") return "From 4-Aug-2025 to 8-Aug-2025"
  if (key < "2025-09-29") return "From 11-Aug-2025 to 26-Sept-2025"
  if (key < "2025-12-15") return "From 29-Sept-2025 to 19-Nov-2025"
  return "From 15-Dec-2025 to 24-Apr-2026"
}

// NEW: get all daily entries sorted across all periods
export function getAllDailyEntriesSorted(): DailyEntry[] {
  const all = [...aug4_8_2025_daily, ...aug11_sept26_2025_daily, ...septNov2025_daily, ...module2_daily]
  return all.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
}

export function getModule2DailyEntriesSorted(): DailyEntry[] {
  return [...module2_daily].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
}
