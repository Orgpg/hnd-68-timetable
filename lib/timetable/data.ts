export const timetable = [
  {
    period: "From 4-Aug-2025 to 8-Aug-2025",
    schedule: {
      MON: [
        {
          time: "9:00-10:30",
          unit: "Unit 4 - Database Design & Development",
          teacher: "Daw Phyu Hnin Thaw",
        },
        {
          time: "10:45-12:15",
          unit: "Unit 3 - Professional Practice",
          teacher: "Daw A Mon Oo",
        },
      ],
      TUE: [
        {
          time: "9:00-10:30",
          unit: "Unit 4 - Database Design & Development",
          teacher: "Daw Phyu Hnin Thaw",
        },
        {
          time: "10:45-12:15",
          unit: "Unit 3 - Professional Practice",
          teacher: "Daw A Mon Oo",
        },
      ],
      WED: [
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
      ],
      THURS: [
        {
          time: "9:00-10:30",
          unit: "Unit 1 - Programming",
          teacher: "Daw Yee Mon",
        },
        {
          time: "10:45-12:15",
          unit: "Unit 2 - Networking",
          teacher: "U Aung Bo Bo Kyaw",
        },
      ],
      FRI: [
        {
          time: "9:00-10:30",
          unit: "Unit 1 - Programming",
          teacher: "Daw Yee Mon",
        },
        {
          time: "10:45-12:15",
          unit: "Unit 2 - Networking",
          teacher: "U Aung Bo Bo Kyaw",
        },
      ],
      SAT: [],
      SUN: [],
    },
  },
  {
    period: "From 11-Aug-2025 to 26-Sept-2025",
    schedule: {
      MON: [
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
      ],
      TUE: [
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
      ],
      WED: [
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
      ],
      THURS: [
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
      ],
      FRI: [
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
      ],
      SAT: [],
      SUN: [],
    },
  },
  {
    period: "From 29-Sept-2025 to 19-Nov-2025",
    schedule: {
      MON: [
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
      ],
      TUE: [
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
      ],
      WED: [
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
      ],
      THURS: [
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
      ],
      FRI: [
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
      ],
      SAT: [],
      SUN: [],
    },
  },
]

export interface ClassSession {
  time: string
  unit: string
  teacher: string
}

// Define a union type for the days of the week
export type DayOfWeek = "MON" | "TUE" | "WED" | "THURS" | "FRI" | "SAT" | "SUN"

export interface TimetablePeriod {
  period: string
  // Use Record utility type with DayOfWeek to specify keys
  schedule: Record<DayOfWeek, ClassSession[]>
}
