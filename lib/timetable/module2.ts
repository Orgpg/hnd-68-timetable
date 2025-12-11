import type { DayOfWeek } from "./data"

export interface DailyClassSession {
    time: string
    unit: string
    teacher: string
}

export interface DailyEntry {
    date: string // YYYY-MM-DD (Asia/Yangon)
    dayCode: DayOfWeek
    label?: string // e.g. "Holiday" or "No Class"
    sessions: DailyClassSession[]
}

// Year 1 Module 2 Schedule: Dec 15, 2026-01-05 4, 2026
export const module2_daily: DailyEntry[] = [
    // Week of Dec 15-21, 2025
    {
        date: "2025-12-15",
        dayCode: "MON",
        label: "Orientation",
        sessions: [{ time: "9:00-10:30", unit: "Orientation", teacher: "" },
        { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
        ],

    },
    {
        date: "2025-12-16",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
        ],
    },
    {
        date: "2025-12-17",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }],
    },
    {
        date: "2025-12-18",
        dayCode: "THURS",
        sessions: [{ time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
        { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2025-12-19",
        dayCode: "FRI",
        sessions: [],
    },
    { date: "2025-12-20", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2025-12-21", dayCode: "SUN", label: "Holiday", sessions: [] },

    // Week of Dec 22-28, 2025
    {
        date: "2025-12-22",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
        ],
    },
    {
        date: "2025-12-23",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
        ],
    },
    {
        date: "2025-12-24",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" },
        ],
    },
    {
        date: "2025-12-25",
        dayCode: "THURS",
        sessions: [],
    },
    {
        date: "2025-12-26",
        dayCode: "FRI",
        sessions: [],
    },
    { date: "2025-12-27", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2025-12-28", dayCode: "SUN", label: "Holiday", sessions: [] },

    // Week of Dec 29, 2025 - Jan 4, 2026
    {
        date: "2025-12-29",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2025-12-30",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },],
    },
    {
        date: "2025-12-31",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-01-01",
        dayCode: "THURS",
        sessions: [],
    },
    {
        date: "2026-01-02",
        dayCode: "FRI",
        sessions: [],
    },
    { date: "2026-01-03", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-01-04", dayCode: "SUN", label: "Holiday", sessions: [] },

    // Week of Jan 5, 2026 - Jan 11, 2026
    {
        date: "2026-01-05",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-01-06",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },],
    },
    {
        date: "2026-01-07",
        dayCode: "WED",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-01-08",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-01-09",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-01-10", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-01-11", dayCode: "SUN", label: "Holiday", sessions: [] },

    // Week of Jan 12, 2026 - Jan 18, 2026
    {
        date: "2026-01-12",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-01-13",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-01-14",
        dayCode: "WED",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-01-15",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-01-16",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-01-17", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-01-18", dayCode: "SUN", label: "Holiday", sessions: [] },


    // Week of Jan 19, 2026 - Jan 25, 2026
    {
        date: "2026-01-19",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-01-20",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-01-21",
        dayCode: "WED",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-01-22",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-01-23",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-01-24", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-01-25", dayCode: "SUN", label: "Holiday", sessions: [] },


    // Week of Jan 26, 2026 - Feb 1, 2026
    {
        date: "2026-01-26",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-01-27",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-01-28",
        dayCode: "WED",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-01-29",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-01-30",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-01-31", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-02-01", dayCode: "SUN", label: "Holiday", sessions: [] },


    // Week of Feb 2, 2026 - Feb 8, 2026
    {
        date: "2026-02-02",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-02-03",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-02-04",
        dayCode: "WED",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-02-05",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-02-06",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-02-07", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-02-08", dayCode: "SUN", label: "Holiday", sessions: [] },


    // Week of Feb 9, 2026 - Feb 15, 2026
    {
        date: "2026-02-09",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-02-10",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-02-11",
        dayCode: "WED",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-02-12",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-02-13",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-02-14", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-02-15", dayCode: "SUN", label: "Holiday", sessions: [] },


    // Week of Feb 16, 2026 - Feb 22, 2026
    {
        date: "2026-02-16",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-02-17",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-02-18",
        dayCode: "WED",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-02-19",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-02-20",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-02-21", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-02-22", dayCode: "SUN", label: "Holiday", sessions: [] },


    // Week of Feb 23, 2026 - Mar 1, 2026
    {
        date: "2026-02-23",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-02-24",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-02-25",
        dayCode: "WED",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-02-26",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-02-27",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-02-28", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-03-01", dayCode: "SUN", label: "Holiday", sessions: [] },


    // Week of Mar 2, 2026 - Mar 6, 2026
    {
        date: "2026-03-02",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-03",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-04",
        dayCode: "WED",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-03-05",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-03-06",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-03-07", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-03-08", dayCode: "SUN", label: "Holiday", sessions: [] },


    // Week of Mar 9, 2026 - Mar 15, 2026
    {
        date: "2026-03-09",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-10",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-11",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-12",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-03-13",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-03-14", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-03-15", dayCode: "SUN", label: "Holiday", sessions: [] },

    // Week of Mar 16, 2026 - Mar 22, 2026
    {
        date: "2026-03-16",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-17",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-18",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-19",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-03-20",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-03-21", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-03-22", dayCode: "SUN", label: "Holiday", sessions: [] },

    // Week of Mar 23, 2026 - Mar 29, 2026
    {
        date: "2026-03-23",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-24",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-25",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-26",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-03-27",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-03-28", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-03-29", dayCode: "SUN", label: "Holiday", sessions: [] },


    // Week of Mar 30, 2026 - Apr 5, 2026
    {
        date: "2026-03-30",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-03-31",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-01",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-02",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-04-03",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-04-04", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-04-05", dayCode: "SUN", label: "Holiday", sessions: [] },

    // Week of Apr 6, 2026 - Apr 12, 2026
    {
        date: "2026-04-06",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-07",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-08",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-09",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-04-10",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-04-11", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-04-12", dayCode: "SUN", label: "Holiday", sessions: [] },

    // Week of Apr 13, 2026 - Apr 19, 2026
    {
        date: "2026-04-13",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-14",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-15",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-16",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-04-17",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    { date: "2026-04-18", dayCode: "SAT", label: "Holiday", sessions: [] },
    { date: "2026-04-19", dayCode: "SUN", label: "Holiday", sessions: [] },

    // Week of Apr 20, 2026 - Apr 24, 2026
    {
        date: "2026-04-20",
        dayCode: "MON",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-21",
        dayCode: "TUE",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-22",
        dayCode: "WED",
        sessions: [
            { time: "9:00-10:30", unit: "Unit 7 - Software Development Lifecycles", teacher: "Daw Yee Mon" },
            { time: "10:45-12:15", unit: "Unit 6 - Planning A Computing Project", teacher: "Dr Myo Myint Oo" },
        ],
    },
    {
        date: "2026-04-23",
        dayCode: "THURS",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },
    {
        date: "2026-04-24",
        dayCode: "FRI",
        sessions: [
            { time: "10:45-12:15", unit: "Unit 13 - Website Design & Development", teacher: "Daw Win Sandar" },
            { time: "10:45-12:15", unit: "Unit 5 - Security", teacher: "U Myo Myint Oo" }
        ],
    },


]
