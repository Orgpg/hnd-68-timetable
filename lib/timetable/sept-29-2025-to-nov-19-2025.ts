import type { DayOfWeek } from "./data";

export interface DailyClassSession {
  time: string;
  unit: string;
  teacher: string;
}

export interface DailyEntry {
  date: string; // YYYY-MM-DD (Asia/Yangon)
  dayCode: DayOfWeek;
  label?: string; // e.g. "Holiday" or "Thadinyut Holiday"
  sessions: DailyClassSession[];
}

const monTueSessions: DailyClassSession[] = [
  {
    time: "9:00-10:30",
    unit: "Unit 2 - Networking",
    teacher: "U Aung Bo Bo Kyaw",
  },
  {
    time: "10:45-12:15",
    unit: "Unit 3 - Professional Practice",
    teacher: "Daw A Mon Oo",
  },
];
const wedSessions: DailyClassSession[] = [
  { time: "9:00-10:30", unit: "Unit 1 - Programming", teacher: "Daw Yee Mon" },
  {
    time: "10:45-12:15",
    unit: "Unit 3 - Professional Practice",
    teacher: "Daw A Mon Oo",
  },
];
const wedThuFriSessions: DailyClassSession[] = [
  { time: "9:00-10:30", unit: "Unit 1 - Programming", teacher: "Daw Yee Mon" },
  {
    time: "10:45-12:15",
    unit: "Unit 4 - Database Design & Development",
    teacher: "Daw Phyu Hnin Thaw",
  },
];

export const septNov2025_daily: DailyEntry[] = [
  // Week of Sep 29
  { date: "2025-09-29", dayCode: "MON", sessions: monTueSessions },
  { date: "2025-09-30", dayCode: "TUE", sessions: monTueSessions },
  { date: "2025-10-01", dayCode: "WED", sessions: wedSessions },
  { date: "2025-10-02", dayCode: "THURS", sessions: wedThuFriSessions },
  { date: "2025-10-03", dayCode: "FRI", sessions: wedThuFriSessions },
  { date: "2025-10-04", dayCode: "SAT", label: "Holiday", sessions: [] },
  {
    date: "2025-10-05",
    dayCode: "SUN",
    label: "Thadinyut Holiday",
    sessions: [],
  },
  {
    date: "2025-10-06",
    dayCode: "MON",
    label: "Full Moon Day Of Thadinyut Holiday",
    sessions: [],
  },
  {
    date: "2025-10-07",
    dayCode: "TUE",
    label: "Thadinyut Holiday",
    sessions: [],
  },

  // Week of Oct 8 (Wed–Fri), then Oct 13–17, 20–24, 27–31
  { date: "2025-10-08", dayCode: "WED", sessions: wedThuFriSessions },
  { date: "2025-10-09", dayCode: "THURS", sessions: wedThuFriSessions },
  { date: "2025-10-10", dayCode: "FRI", sessions: wedThuFriSessions },
  { date: "2025-10-11", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-10-12", dayCode: "SUN", label: "Holiday", sessions: [] },

  { date: "2025-10-13", dayCode: "MON", sessions: monTueSessions },
  { date: "2025-10-14", dayCode: "TUE", sessions: monTueSessions },
  { date: "2025-10-15", dayCode: "WED", sessions: wedThuFriSessions },
  { date: "2025-10-16", dayCode: "THURS", sessions: wedThuFriSessions },
  { date: "2025-10-17", dayCode: "FRI", sessions: wedThuFriSessions },
  { date: "2025-10-18", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-10-19", dayCode: "SUN", label: "Holiday", sessions: [] },

  { date: "2025-10-20", dayCode: "MON", sessions: monTueSessions },
  { date: "2025-10-21", dayCode: "TUE", sessions: monTueSessions },
  { date: "2025-10-22", dayCode: "WED", sessions: wedThuFriSessions },
  { date: "2025-10-23", dayCode: "THURS", sessions: wedThuFriSessions },
  { date: "2025-10-24", dayCode: "FRI", sessions: wedThuFriSessions },
  { date: "2025-10-25", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-10-26", dayCode: "SUN", label: "Holiday", sessions: [] },

  { date: "2025-10-27", dayCode: "MON", sessions: monTueSessions },
  { date: "2025-10-28", dayCode: "TUE", sessions: monTueSessions },
  { date: "2025-10-29", dayCode: "WED", sessions: wedThuFriSessions },
  { date: "2025-10-30", dayCode: "THURS", sessions: wedThuFriSessions },
  { date: "2025-10-31", dayCode: "FRI", sessions: wedThuFriSessions },
  { date: "2025-11-01", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-11-02", dayCode: "SUN", label: "Holiday", sessions: [] },

  // Nov 3–7
  { date: "2025-11-03", dayCode: "MON", sessions: monTueSessions },
  { date: "2025-11-04", dayCode: "TUE", sessions: monTueSessions },
  { date: "2025-11-05", dayCode: "WED", sessions: wedThuFriSessions },
  { date: "2025-11-06", dayCode: "THURS", sessions: wedThuFriSessions },
  { date: "2025-11-07", dayCode: "FRI", sessions: wedThuFriSessions },
  { date: "2025-11-08", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-11-09", dayCode: "SUN", label: "Holiday", sessions: [] },

  // Nov 10–14
  { date: "2025-11-10", dayCode: "MON", sessions: monTueSessions },
  { date: "2025-11-11", dayCode: "TUE", sessions: monTueSessions },
  { date: "2025-11-12", dayCode: "WED", sessions: wedThuFriSessions },
  { date: "2025-11-13", dayCode: "THURS", sessions: wedThuFriSessions },
  { date: "2025-11-14", dayCode: "FRI", sessions: wedThuFriSessions },
  { date: "2025-11-15", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-11-16", dayCode: "SUN", label: "Holiday", sessions: [] },

  // Nov 17–19 (end)
  { date: "2025-11-17", dayCode: "MON", sessions: monTueSessions },
  { date: "2025-11-18", dayCode: "TUE", sessions: monTueSessions },
  { date: "2025-11-19", dayCode: "WED", sessions: wedThuFriSessions },
];
