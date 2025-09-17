import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, BookOpen, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Assignment } from "@/lib/types";
import {
  FaCode,
  FaNetworkWired,
  FaBriefcase,
  FaDatabase,
} from "react-icons/fa";

interface AssignmentCardProps {
  assignment: Assignment;
}

const subjectIcons: Record<string, React.ElementType> = {
  Programming: FaCode,
  Networking: FaNetworkWired,
  "Professional Practice": FaBriefcase,
  "Database Design and Development": FaDatabase,
};

function getUnitAccentColor(unitName: string): string {
  if (unitName.includes("Programming")) return "border-l-blue-500";
  if (unitName.includes("Networking")) return "border-l-green-500";
  if (unitName.includes("Professional Practice")) return "border-l-purple-500";
  if (unitName.includes("Database")) return "border-l-orange-500";
  return "border-l-primary";
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const accentColorClass = getUnitAccentColor(assignment.unitName);
  const IconComponent = subjectIcons[assignment.unitName] || BookOpen;

  return (
    <Card
      className={`bg-card border-l-4 ${accentColorClass} shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-primary mb-1 text-balance">
              {assignment.unitName}
            </CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconComponent className="h-4 w-4" />
              <span className="text-sm font-medium">
                Assignment {assignment.assignmentNo}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <CalendarDays className="h-4 w-4 text-primary flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium text-card-foreground">
                Hand Out Date
              </div>
              <div className="text-sm text-muted-foreground">
                {assignment.handOutDate}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium text-card-foreground">
                Hand In Date
              </div>
              <div className="text-sm text-muted-foreground">
                {assignment.handInDate}
              </div>
            </div>
          </div>
        </div>

        {assignment.formativeAssessmentDate.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-card-foreground mb-2">
                  Formative Assessment
                </div>
                <div className="space-y-1">
                  {assignment.formativeAssessmentDate.map((date, index) => (
                    <div
                      key={index}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {date}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {assignment.presentationDemoDate && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
              <BookOpen className="h-4 w-4 text-accent flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-card-foreground">
                  Presentation Date
                </div>
                <div className="text-sm text-muted-foreground">
                  {assignment.presentationDemoDate}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full group bg-transparent"
          >
            View Details
            <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
}
