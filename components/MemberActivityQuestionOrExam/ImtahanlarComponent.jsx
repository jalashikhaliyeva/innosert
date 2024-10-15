import React, { useState } from "react";
import ExamsListTeacher from "@/components/ExamsListTeacher";

function ImtahanlarComponent({ viewMode, sortOption }) {
  // Use the same exams data as in SubExamsListTeacher
  const examsData = [
    {
      folder: false,
      name: "Physics Midterm Exam",
      slug: "midterm-physics-exam",
      date: "2024-10-10",
      subject: "Physics",
      level: "Orta",
      difficulty: "Orta",
      questions: 30,
      url: "/exams/physics-midterm",
    },
    {
      folder: false,
      name: "Chemistry Final Exam",
      slug: "chemistry-final-exam",
      date: "2024-12-20",
      subject: "Chemistry",
      level: "Yüksək",
      difficulty: "Çətin",
      questions: 40,
      url: "/exams/chemistry-final",
    },
    // Add more exams as needed
  ];

  // State to manage selected exams
  const [selectedExams, setSelectedExams] = useState([]);

  return (
    <div>
      <ExamsListTeacher
        exams={examsData}
        viewMode="grid"
        sortOption={sortOption}
        openEditExamModal={() => {}}
        openDeleteExamModal={() => {}}
        selectedExams={selectedExams}
        setSelectedExams={setSelectedExams}
      />
    </div>
  );
}

export default ImtahanlarComponent;
