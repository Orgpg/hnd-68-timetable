"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AssignmentCard } from "@/components/assignment-card";
import { assignments } from "@/lib/assignments/data";
import { BookOpenCheck } from "lucide-react";

export default function AssignmentsPage() {
  const assignment1 = assignments.filter(
    (assignment) => assignment.assignmentNo === 1
  );
  const assignment2 = assignments.filter(
    (assignment) => assignment.assignmentNo === 2
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <BookOpenCheck className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-teal-600 dark:text-teal-400 mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
              HND 68{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                Assignments
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-md sm:text-base mb-2">
              Year 1, Module 1
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Stay updated with your assignment details and deadlines for each
              unit.
            </p>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
              <h3 className="px-6 text-2xl font-bold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950">
                Assignment 1
              </h3>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {assignment1.map((assignment) => (
                <AssignmentCard key={assignment.no} assignment={assignment} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
              <h3 className="px-6 text-2xl font-bold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950">
                Assignment 2
              </h3>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {assignment2.map((assignment) => (
                <AssignmentCard key={assignment.no} assignment={assignment} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
