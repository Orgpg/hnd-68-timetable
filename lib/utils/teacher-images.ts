// Teacher image mappings for Module 2
export const teacherImages: Record<string, string> = {
    "Daw Yee Mon": "/teachers/Daw Yee Mon.jpg",
    "Daw Phyu Hnin Thaw": "/teachers/professional-female-asian-instructor-portrait.jpg",
    "U Aung Bo Bo Kyaw": "/teachers/professional-male-asian-teacher-portrait.jpg",
    "Daw A Mon Oo": "/teachers/professional-female-asian-educator-portrait.jpg",
    "Dr Myo Myint Oo": "/teachers/Dr Myo Myint Oo.jpg",
    "U Myo Myint Oo": "/teachers/U Myo Myint Oo.jpg",
    "Daw Win Sandar": "/teachers/Daw Win Sandar.png",
}

export function getTeacherImage(teacherName: string): string {
    return teacherImages[teacherName] || "/professional-teacher-portrait.png"
}
