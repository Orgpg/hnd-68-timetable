import type { DayOfWeek } from "./data";

export interface DailyClassSession {
  time: string;
  unit: string;
  teacher: string;
}

export interface DailyEntry {
  date: string; // YYYY-MM-DD (Asia/Yangon)
  dayCode: DayOfWeek;
  label?: string; // e.g. "Holiday"
  sessions: DailyClassSession[];
}

export const jul23_27_2025_daily: DailyEntry[] = [
  {
    date: "2025-07-23",
    dayCode: "WED",
    sessions: [
      { time: "9:00-10:30", unit: "Unit 2 - Orientation", teacher: "Academic" },
      {
        time: "10:45-12:15",
        unit: "Unit 4 - Orientation",
        teacher: "Academic",
      },
    ],
  },
  {
    date: "2025-07-24",
    dayCode: "THURS",
    sessions: [
      {
        time: "9:00-10:30",
        unit: "Unit 1 - Induction (Academic)",
        teacher: "Academic",
      },
      {
        time: "10:45-12:15",
        unit: "Unit 2 - Induction (Academic)",
        teacher: "Academic",
      },
    ],
  },
  {
    date: "2025-07-25",
    dayCode: "FRI",
    sessions: [
      {
        time: "9:00-10:30",
        unit: "Unit 1 - Programming",
        teacher: "Daw Yee Mon",
      },
      {
        time: "10:45-12:15",
        unit: "Unit 3 - Professional Practice",
        teacher: "Daw A Mon Oo",
      },
    ],
  },
  {
    date: "2025-07-26",
    dayCode: "SAT",
    label: "Holiday",
    sessions: [],
  },
  {
    date: "2025-07-27",
    dayCode: "SUN",
    label: "Holiday",
    sessions: [],
  },
];
