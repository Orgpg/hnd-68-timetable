export interface ClassSession {
  unit: string;
  subject: string;
  instructor: string;
  time: string;
}

export interface DaySchedule {
  day: string;
  sessions: ClassSession[];
}

export interface WeeklyTimetable {
  id: string;
  title: string;
  schedule: DaySchedule[];
}

export interface Assignment {
  no: number;
  unitName: string;
  assignmentNo: number;
  handOutDate: string;
  formativeAssessmentDate: string[];
  handInDate: string;
  presentationDemoDate: string | null;
}
