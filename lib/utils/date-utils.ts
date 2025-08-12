import type { DayOfWeek, ClassSession } from "@/lib/timetable/data" // Import ClassSession

// Define a mapping from Date.getDay() (0-6) to our DayOfWeek type
const DAY_INDEX_TO_DAY_OF_WEEK: string[] = [
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

export function getMyanmarDate(): Date {
  // WARNING: This method of getting Myanmar date can be inconsistent across environments
  // and may lead to off-by-one day errors due to string parsing and local timezone interpretation.
  // It is reverted to previous state as per user request for timetable display.
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Yangon" }))
}

export function getCurrentDay(): DayOfWeek {
  const myanmarDate = getMyanmarDate()
  const dayIndex = myanmarDate.getDay() // 0 for Sunday, 1 for Monday, etc.
  return DAY_INDEX_TO_DAY_OF_WEEK[dayIndex] as DayOfWeek
}

export function getTomorrowDay(): DayOfWeek {
  const tomorrow = new Date(getMyanmarDate())
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayIndex = tomorrow.getDay()
  return DAY_INDEX_TO_DAY_OF_WEEK[dayIndex] as DayOfWeek
}

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
 * Formats a Date object into a readable date string (e.g., "August 7, 2025") in Myanmar timezone.
 * @param date The Date object to format.
 * @returns Formatted date string.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    timeZone: "Asia/Yangon",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getUnitColor(unit: string): string {
  if (unit.includes("Unit 1")) return "from-blue-500 to-blue-600"
  if (unit.includes("Unit 2")) return "from-green-500 to-green-600"
  if (unit.includes("Unit 3")) return "from-purple-500 to-purple-600"
  if (unit.includes("Unit 4")) return "from-orange-500 to-orange-600"
  return "from-gray-500 to-gray-600"
}

// Re-adding getUnitIcon for timetable components
export function getUnitIcon(unit: string): string {
  if (unit.includes("Programming")) return "💻"
  if (unit.includes("Networking")) return "🌐"
  if (unit.includes("Professional Practice")) return "💼"
  if (unit.includes("Database")) return "🗄️"
  return "📚"
}

/**
 * Gets a Date object for the specified day of the week in the current week (relative to Myanmar time).
 * @param dayCode The three-letter day code (e.g., "MON", "SUN").
 * @returns A Date object representing the specified day in the current week.
 */
export function getDateForDay(dayCode: DayOfWeek): Date {
  const now = getMyanmarDate()
  const currentDayOfWeek = now.getDay() // 0 (Sun) - 6 (Sat)
  const targetDayOfWeek = DAY_MAP[dayCode]

  const diff = targetDayOfWeek - currentDayOfWeek
  const targetDate = new Date(now)
  targetDate.setDate(now.getDate() + diff)
  return targetDate
}

/**
 * Parses a time string (e.g., "09:00") and applies it to a base Date object.
 * @param timeString The time in "HH:MM" format.
 * @param baseDate The base Date object to apply the time to.
 * @returns A new Date object with the time set.
 */
export function parseTime(timeString: string, baseDate: Date): Date {
  const [hours, minutes] = timeString.split(":").map(Number)
  const date = new Date(baseDate)
  date.setHours(hours, minutes, 0, 0)
  return date
}

/**
 * Checks if a class session has already completed based on the current Myanmar time.
 * @param session The ClassSession object.
 * @param dayCode The day of the week for the session.
 * @returns True if the session's end time is in the past, false otherwise.
 */
export function isSessionCompleted(session: ClassSession, dayCode: DayOfWeek): boolean {
  const now = getMyanmarDate()
  const sessionDate = getDateForDay(dayCode) // Get the specific date for the session's day

  const [, endTimeStr] = session.time.split("-") // Get the end time part (e.g., "10:30")
  const sessionEndTime = parseTime(endTimeStr, sessionDate)

  return now.getTime() > sessionEndTime.getTime()
}

/**
 * Formats a session time string (e.g., "9:00-10:30") to include AM/PM.
 * @param timeRange The time range string (e.g., "HH:MM-HH:MM").
 * @returns Formatted time string (e.g., "9:00 AM - 10:30 AM").
 */
export function formatSessionTime(timeRange: string): string {
  const [startTimeStr, endTimeStr] = timeRange.split("-")

  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }

  // Create dummy dates to use toLocaleTimeString
  const dummyDate = new Date()
  const [startHours, startMinutes] = startTimeStr.split(":").map(Number)
  dummyDate.setHours(startHours, startMinutes, 0, 0)
  const formattedStartTime = dummyDate.toLocaleTimeString("en-US", formatOptions)

  const [endHours, endMinutes] = endTimeStr.split(":").map(Number)
  dummyDate.setHours(endHours, endMinutes, 0, 0)
  const formattedEndTime = dummyDate.toLocaleTimeString("en-US", formatOptions)

  return `${formattedStartTime} - ${formattedEndTime}`
}

export function isWeekend(day: DayOfWeek): boolean {
  return day === "SAT" || day === "SUN"
}

export function isHoliday(day: DayOfWeek): boolean {
  return isWeekend(day)
}

/**
 * Checks if a class session has already completed based on an explicit calendar date in Myanmar timezone.
 * @param session The ClassSession object.
 * @param dateAtYGN The specific date in Myanmar timezone to check against.
 * @returns True if the session's end time is in the past relative to the given date, false otherwise.
 */
export function isSessionCompletedAtDate(session: ClassSession, dateAtYGN: Date): boolean {
  const now = getMyanmarDate()
  const timeRange = session.time.replace(/\s/g, "")
  const [_, endStr] = timeRange.split("-")
  const end = parseTime(endStr, dateAtYGN)
  return now.getTime() > end.getTime()
}

// Add the ymdKey function and export it
export function ymdKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}
