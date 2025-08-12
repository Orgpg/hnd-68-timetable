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

// Helper to build a weekday session set for this period:
const sessionsFor = (day: DayOfWeek): DailyClassSession[] => {
  if (day === "THURS" || day === "FRI") {
    return [
      {
        time: "9:00-10:30",
        unit: "Unit 1 - Programming",
        teacher: "Daw Yee Mon",
      },
      {
        time: "10:45-12:15",
        unit: "Unit 4 - Database Design & Development",
        teacher: "Daw Phyu Hnin Thaw",
      },
    ];
  }
  if (day === "WED") {
    return [
      {
        time: "9:00-10:30",
        unit: "Unit 2 - Networking",
        teacher: "U Aung Bo Bo Kyaw",
      },
      {
        time: "10:45-12:15",
        unit: "Unit 4 - Database Design & Development",
        teacher: "Daw Phyu Hnin Thaw",
      },
    ];
  }
  if (day === "MON" || day === "TUE") {
    return [
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
  }
  return [];
};

// Build explicit daily list exactly as in the attachment:
export const aug11_sept26_2025_daily: DailyEntry[] = [
  // Week of Aug 11
  { date: "2025-08-11", dayCode: "MON", sessions: sessionsFor("MON") },
  { date: "2025-08-12", dayCode: "TUE", sessions: sessionsFor("TUE") },
  { date: "2025-08-13", dayCode: "WED", sessions: sessionsFor("WED") },
  { date: "2025-08-14", dayCode: "THURS", sessions: sessionsFor("THURS") },
  { date: "2025-08-15", dayCode: "FRI", sessions: sessionsFor("FRI") },
  { date: "2025-08-16", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-08-17", dayCode: "SUN", label: "Holiday", sessions: [] },

  // Week of Aug 18
  { date: "2025-08-18", dayCode: "MON", sessions: sessionsFor("MON") },
  { date: "2025-08-19", dayCode: "TUE", sessions: sessionsFor("TUE") },
  { date: "2025-08-20", dayCode: "WED", sessions: sessionsFor("WED") },
  { date: "2025-08-21", dayCode: "THURS", sessions: sessionsFor("THURS") },
  { date: "2025-08-22", dayCode: "FRI", sessions: sessionsFor("FRI") },
  { date: "2025-08-23", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-08-24", dayCode: "SUN", label: "Holiday", sessions: [] },

  // Week of Aug 25
  { date: "2025-08-25", dayCode: "MON", sessions: sessionsFor("MON") },
  { date: "2025-08-26", dayCode: "TUE", sessions: sessionsFor("TUE") },
  { date: "2025-08-27", dayCode: "WED", sessions: sessionsFor("WED") },
  { date: "2025-08-28", dayCode: "THURS", sessions: sessionsFor("THURS") },
  { date: "2025-08-29", dayCode: "FRI", sessions: sessionsFor("FRI") },
  { date: "2025-08-30", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-08-31", dayCode: "SUN", label: "Holiday", sessions: [] },

  // Week of Sep 1
  { date: "2025-09-01", dayCode: "MON", sessions: sessionsFor("MON") },
  { date: "2025-09-02", dayCode: "TUE", sessions: sessionsFor("TUE") },
  { date: "2025-09-03", dayCode: "WED", sessions: sessionsFor("WED") },
  { date: "2025-09-04", dayCode: "THURS", sessions: sessionsFor("THURS") },
  { date: "2025-09-05", dayCode: "FRI", sessions: sessionsFor("FRI") },
  { date: "2025-09-06", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-09-07", dayCode: "SUN", label: "Holiday", sessions: [] },

  // Week of Sep 8 — attachment does not list Mon 8, so we keep it as a day with no classes.
  { date: "2025-09-08", dayCode: "MON", label: "Holiday", sessions: [] },
  { date: "2025-09-09", dayCode: "TUE", sessions: sessionsFor("TUE") },
  { date: "2025-09-10", dayCode: "WED", sessions: sessionsFor("WED") },
  { date: "2025-09-11", dayCode: "THURS", sessions: sessionsFor("THURS") },
  { date: "2025-09-12", dayCode: "FRI", sessions: sessionsFor("FRI") },
  { date: "2025-09-13", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-09-14", dayCode: "SUN", label: "Holiday", sessions: [] },

  // Week of Sep 15 — attachment does not list Mon 15
  { date: "2025-09-15", dayCode: "MON", label: "Holiday", sessions: [] },
  { date: "2025-09-16", dayCode: "TUE", sessions: sessionsFor("TUE") },
  { date: "2025-09-17", dayCode: "WED", sessions: sessionsFor("WED") },
  { date: "2025-09-18", dayCode: "THURS", sessions: sessionsFor("THURS") },
  { date: "2025-09-19", dayCode: "FRI", sessions: sessionsFor("FRI") },
  { date: "2025-09-20", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-09-21", dayCode: "SUN", label: "Holiday", sessions: [] },

  // Week of Sep 22 — attachment does not list Mon 22
  { date: "2025-09-22", dayCode: "MON", label: "Holiday", sessions: [] },
  { date: "2025-09-23", dayCode: "TUE", sessions: sessionsFor("TUE") },
  { date: "2025-09-24", dayCode: "WED", sessions: sessionsFor("WED") },
  { date: "2025-09-25", dayCode: "THURS", sessions: sessionsFor("THURS") },
  { date: "2025-09-26", dayCode: "FRI", sessions: sessionsFor("FRI") },
  { date: "2025-09-27", dayCode: "SAT", label: "Holiday", sessions: [] },
  { date: "2025-09-28", dayCode: "SUN", label: "Holiday", sessions: [] },
];
