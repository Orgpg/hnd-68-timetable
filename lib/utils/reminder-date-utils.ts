import type { DayOfWeek } from "@/lib/timetable/data" // Import ClassSession

// Define a mapping from Date.getDay() (0-6) to our DayOfWeek type
export const DAY_INDEX_TO_DAY_OF_WEEK: string[] = [
  // Exported for use in cron job
  "SUN", // 0
  "MON", // 1
  "TUE", // 2
  "WED", // 3
  "THURS", // 4 (Thursday)
  "FRI", // 5
  "SAT", // 6
]

// Helper map for day codes to Date.getDay() values
const DAY_MAP: Record<DayOfWeek, number> = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THURS: 4,
  FRI: 5,
  SAT: 6,
}

/**
 * Returns a Date object whose internal UTC value corresponds to the current time in Asia/Yangon.
 * This Date object can then be used with UTC methods (getUTCFullYear, getUTCMonth, etc.)
 * to get Myanmar time components, or with toLocaleString for display.
 */
export function getMyanmarDate(): Date {
  const now = new Date() // Current time in server's local timezone (e.g., UTC on Vercel)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23", // Use 24-hour format for easier parsing
    timeZone: "Asia/Yangon",
  }
  const formatter = new Intl.DateTimeFormat("en-US", options)
  const parts = formatter.formatToParts(now)

  const year = Number.parseInt(parts.find((p) => p.type === "year")?.value || "0")
  const month = Number.parseInt(parts.find((p) => p.type === "month")?.value || "0") - 1 // Month is 0-indexed
  const day = Number.parseInt(parts.find((p) => p.type === "day")?.value || "0")
  const hour = Number.parseInt(parts.find((p) => p.type === "hour")?.value || "0")
  const minute = Number.parseInt(parts.find((p) => p.type === "minute")?.value || "0")
  const second = Number.parseInt(parts.find((p) => p.type === "second")?.value || "0")

  // Create a UTC date from these Myanmar time components.
  // This Date object's internal UTC value will be the UTC equivalent of the Myanmar time.
  return new Date(Date.UTC(year, month, day, hour, minute, second))
}

/**
 * Parses a time string (e.g., "09:00") and applies it to a base Date object,
 * ensuring the resulting Date object's internal UTC value reflects the time in Myanmar timezone.
 * @param timeString The time in "HH:MM" format.
 * @param baseDate The base Date object (its date components will be used, assumed to be UTC-adjusted for MMT).
 * @returns A new Date object with the time set, representing MMT.
 */
export function parseTime(timeString: string, baseDate: Date): Date {
  const [hours, minutes] = timeString.split(":").map(Number)

  // Get the UTC components of the baseDate (which is already MMT-adjusted)
  const year = baseDate.getUTCFullYear()
  const month = baseDate.getUTCMonth()
  const day = baseDate.getUTCDate()

  // Create a new Date object using these UTC components and the desired hours/minutes.
  // This will result in a Date object whose internal UTC value is the exact UTC equivalent
  // of the desired Myanmar time.
  return new Date(Date.UTC(year, month, day, hours, minutes, 0, 0))
}

/**
 * Helper to add days to a Date object, operating on its UTC date components.
 * @param d The Date object to modify (assumed to be UTC-adjusted for MMT).
 * @param n The number of days to add.
 * @returns A new Date object with the days added.
 */
export function addDays(d: Date, n: number) {
  const x = new Date(d)
  x.setUTCDate(x.getUTCDate() + n)
  return x
}

/**
 * Formats a Date object into a readable date string (e.g., "August 7, 2025") in Myanmar timezone.
 * @param date The Date object to format (assumed to be UTC-adjusted for MMT).
 * @returns Formatted date string.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    timeZone: "Asia/Yangon", // This option correctly formats the date string
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Gets the three-letter day code (e.g., "MON", "SUN") for a given DayOfWeek.
 * @param dayCode The three-letter day code.
 * @returns The full day name.
 */
export function getDayName(dayCode: DayOfWeek): string {
  const dayNames: Record<DayOfWeek, string> = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THURS: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
  }
  return dayNames[dayCode] || dayCode
}

/**
 * Generates a YYYY-MM-DD key for a given Date object, using its UTC components.
 * @param date The Date object (assumed to be UTC-adjusted for MMT).
 * @returns A string in YYYY-MM-DD format.
 */
export function ymdKey(date: Date): string {
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, "0")
  const d = String(date.getUTCDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

/**
 * Formats a session time string (e.g., "9:00-10:30") to include AM/PM for Myanmar timezone.
 * @param timeRange The time range string (e.g., "HH:MM-HH:MM").
 * @returns Formatted time string (e.g., "9:00 AM - 10:30 AM").
 */
export function formatSessionTime(timeRange: string): string {
  const [startTimeStr, endTimeStr] = timeRange.split("-")

  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Yangon", // Ensure formatting is for MMT
  }

  // Create dummy dates to use toLocaleTimeString.
  // We use a base Date object and set its UTC hours/minutes, then format it for MMT.
  const dummyDate = new Date()
  const [startHours, startMinutes] = startTimeStr.split(":").map(Number)
  dummyDate.setUTCHours(startHours, startMinutes, 0, 0)
  const formattedStartTime = dummyDate.toLocaleTimeString("en-US", formatOptions)

  const [endHours, endMinutes] = endTimeStr.split(":").map(Number)
  dummyDate.setUTCHours(endHours, endMinutes, 0, 0)
  const formattedEndTime = dummyDate.toLocaleTimeString("en-US", formatOptions)

  return `${formattedStartTime} - ${formattedEndTime}`
}
