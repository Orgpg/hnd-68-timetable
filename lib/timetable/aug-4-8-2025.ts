import type { DayOfWeek } from "./data"

export interface DailyClassSession {
  time: string
  unit: string
  teacher: string
}

export interface DailyEntry {
  date: string // YYYY-MM-DD (Asia/Yangon)
  dayCode: DayOfWeek
  label?: string // e.g. "Holiday"
  sessions: DailyClassSession[]
}

export const aug4_8_2025_daily: DailyEntry[] = [
  {
    date: "2025-08-04",
    dayCode: "MON",
    sessions: [
      { time: "9:00-10:30", unit: "Unit 4 - Database Design & Development", teacher: "Daw Phyu Hnin Thaw" },
      { time: "10:45-12:15", unit: "Unit 3 - Professional Practice", teacher: "Daw A Mon Oo" },
    ],
  },
  {
    date: "2025-08-05",
    dayCode: "TUE",
    sessions: [
      { time: "9:00-10:30", unit: "Unit 4 - Database Design & Development", teacher: "Daw Phyu Hnin Thaw" },
      { time: "10:45-12:15", unit: "Unit 3 - Professional Practice", teacher: "Daw A Mon Oo" },
    ],
  },
  {
    date: "2025-08-06",
    dayCode: "WED",
    sessions: [
      { time: "9:00-10:30", unit: "Unit 2 - Networking", teacher: "U Aung Bo Bo Kyaw" },
      { time: "10:45-12:15", unit: "Unit 4 - Database Design & Development", teacher: "Daw Phyu Hnin Thaw" },
    ],
  },
  {
    date: "2025-08-07",
    dayCode: "THURS",
    sessions: [
      { time: "9:00-10:30", unit: "Unit 1 - Programming", teacher: "Daw Yee Mon" },
      { time: "10:45-12:15", unit: "Unit 2 - Networking", teacher: "U Aung Bo Bo Kyaw" },
    ],
  },
  {
    date: "2025-08-08",
    dayCode: "FRI",
    sessions: [
      { time: "9:00-10:30", unit: "Unit 1 - Programming", teacher: "Daw Yee Mon" },
      { time: "10:45-12:15", unit: "Unit 2 - Networking", teacher: "U Aung Bo Bo Kyaw" },
    ],
  },
  {
    date: "2025-08-09",
    dayCode: "SAT",
    label: "Holiday",
    sessions: [],
  },
  {
    date: "2025-08-10",
    dayCode: "SUN",
    label: "Holiday",
    sessions: [],
  },
]
