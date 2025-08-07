import { septNov2025 } from "./sept-29-2025-to-nov-19-2025.ts"; // Added .ts extension
import { aug4_8_2025 } from "./aug-4-8-2025";
import { aug11_sept26_2025 } from "./aug-11-sept-26-2025";
import type { WeeklyTimetable } from "../types";

export const allTimetables: WeeklyTimetable[] = [
  septNov2025,
  aug4_8_2025,
  aug11_sept26_2025,
];

// Use the first timetable as current active timetable
export const currentTimetable = septNov2025;

// Re-export individual timetables
export { septNov2025, aug4_8_2025, aug11_sept26_2025 };
