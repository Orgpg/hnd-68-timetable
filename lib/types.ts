export interface ClassSession {
  unit: string
  subject: string
  instructor: string
  time: string
}

export interface DaySchedule {
  day: string
  sessions: ClassSession[]
}

export interface WeeklyTimetable {
  id: string
  title: string
  schedule: DaySchedule[]
}

export interface Assignment {
  id: string
  unit: string
  subject: string
  startDate: string // Will be "Coming Soon" for now
  deadline: string // Will be "Coming Soon" for now
}
