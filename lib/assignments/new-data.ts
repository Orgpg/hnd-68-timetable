export interface Assignment {
  no: number;
  unitName: string;
  assignmentNo: number;
  handOutDate: string;
  formativeAssessmentDate: string[];
  handInDate: string;
  presentationDemoDate: string | null;
}

export const assignments: Assignment[] = [
  {
    no: 1,
    unitName: "Database Design and Development",
    assignmentNo: 1,
    handOutDate: "19/Sep/2025 (Fri)",
    formativeAssessmentDate: ["2/Oct/2025 (Thu)", "3/Oct/2025 (Fri)"],
    handInDate: "18/Oct/2025 (Sat)",
    presentationDemoDate: null,
  },
  {
    no: 2,
    unitName: "Networking",
    assignmentNo: 1,
    handOutDate: "23/Sep/2025 (Tue)",
    formativeAssessmentDate: ["13/Oct/2025 (Mon)", "14/Oct/2025 (Tue)"],
    handInDate: "22/Oct/2025 (Wed)",
    presentationDemoDate: null,
  },
  {
    no: 3,
    unitName: "Programming",
    assignmentNo: 1,
    handOutDate: "2/Oct/2025 (Thu)",
    formativeAssessmentDate: ["16/Oct/2025 (Thu)", "17/Oct/2025 (Fri)"],
    handInDate: "25/Oct/2025 (Sat)",
    presentationDemoDate: null,
  },
  {
    no: 4,
    unitName: "Professional Practice",
    assignmentNo: 1,
    handOutDate: "20/Oct/2025 (Mon)",
    formativeAssessmentDate: ["10/Nov/2025 (Mon)", "11/Nov/2025 (Tue)"],
    handInDate: "20/Nov/2025 (Thu)",
    presentationDemoDate: null,
  },
  {
    no: 5,
    unitName: "Database Design and Development",
    assignmentNo: 2,
    handOutDate: "23/Oct/2025 (Thu)",
    formativeAssessmentDate: ["6/Nov/2025 (Thu)", "7/Nov/2025 (Fri)"],
    handInDate: "24/Nov/2025 (Mon)",
    presentationDemoDate: null,
  },
  {
    no: 6,
    unitName: "Networking",
    assignmentNo: 2,
    handOutDate: "28/Oct/2025 (Tue)",
    formativeAssessmentDate: ["17/Nov/2025 (Mon)", "18/Nov/2025 (Tue)"],
    handInDate: "27/Nov/2025 (Thu)",
    presentationDemoDate: null,
  },
  {
    no: 7,
    unitName: "Programming",
    assignmentNo: 2,
    handOutDate: "31/Oct/2025 (Fri)",
    formativeAssessmentDate: ["12/Nov/2025 (Wed)", "13/Nov/2025 (Thu)"],
    handInDate: "1/Dec/2025 (Mon)",
    presentationDemoDate: null,
  },
];
