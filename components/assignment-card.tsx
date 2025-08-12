import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, BookOpen } from "lucide-react" // Keep CalendarDays, Clock, and BookOpen from lucide-react
import type { Assignment } from "@/lib/types"
import { getUnitColor } from "@/lib/utils/date-utils" // Only import getUnitColor
import { FaCode, FaNetworkWired, FaBriefcase, FaDatabase } from "react-icons/fa" // Import specific react-icons

interface AssignmentCardProps {
  assignment: Assignment
}

// Map subjects to react-icons
const subjectIcons: Record<string, React.ElementType> = {
  Programming: FaCode,
  Networking: FaNetworkWired,
  "Professional Practice": FaBriefcase,
  "Database Design & Development": FaDatabase,
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const unitColorClass = getUnitColor(assignment.unit)
  const IconComponent = subjectIcons[assignment.subject] || BookOpen // Fallback to BookOpen from lucide-react if no specific icon

  return (
    <Card
      className={`relative overflow-hidden bg-gradient-to-br ${unitColorClass} text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <CardHeader className="pb-3 flex flex-col items-center justify-center text-center pt-6">
        <div className="mb-4 text-5xl opacity-70">{IconComponent && <IconComponent />}</div>
        <CardTitle className="text-xl font-bold">
          {assignment.unit} - {assignment.subject}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 opacity-80" />
          <span className="text-sm font-medium opacity-90">
            Start Date: <span className="font-semibold">{assignment.startDate}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 opacity-80" />
          <span className="text-sm font-medium opacity-90">
            Deadline: <span className="font-semibold">{assignment.deadline}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-white/20">
          <BookOpen className="h-4 w-4 opacity-80" /> {/* BookOpen from lucide-react */}
          <span className="text-xs opacity-70">More details coming soon!</span>
        </div>
      </CardContent>
    </Card>
  )
}
