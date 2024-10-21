import React, { useContext, useState } from "react";
import ExamsListTeacher from "@/components/ExamsListTeacher";
import CompanyContext from "@/shared/context/CompanyContext";

function ExamListCompany({
  viewMode,
  sortOption,
  selectedExams,
  setSelectedExams,
}) {
  const { selectedCompany } = useContext(CompanyContext);
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
    {
      folder: false,
      name: "Mathematics Midterm Exam",
      slug: "math-midterm-exam",
      date: "2024-11-15",
      subject: "Mathematics",
      level: "Orta",
      difficulty: "Asan",
      questions: 25,
      url: "/exams/math-midterm",
    },
    {
      folder: false,
      name: "Biology Final Exam",
      slug: "biology-final-exam",
      date: "2024-12-18",
      subject: "Biology",
      level: "Orta",
      difficulty: "Orta",
      questions: 35,
      url: "/exams/biology-final",
    },
    {
      folder: false,
      name: "History Quiz",
      slug: "history-quiz",
      date: "2024-09-25",
      subject: "History",
      level: "Aşağı",
      difficulty: "Asan",
      questions: 15,
      url: "/exams/history-quiz",
    },
  ];

  // State to manage selected exams
  //   const [selectedExams, setSelectedExams] = useState([]);

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
        showTeacherName={!!selectedCompany}
      />
    </div>
  );
}

export default ExamListCompany;
