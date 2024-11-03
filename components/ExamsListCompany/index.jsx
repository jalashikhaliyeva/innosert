import React, { useContext, useState } from "react";
import ExamsListTeacher from "@/components/ExamsListTeacher";
import CompanyContext from "@/shared/context/CompanyContext";

function ExamListCompany({
  viewMode,
  sortOption,
  selectedExams,
  setSelectedExams,
  openEditExamModal,
  openDeleteExamModal,
  openEditFolderModal,
  exams,
}) {
  const { selectedCompany } = useContext(CompanyContext);
  console.log(exams, "folders exam list company ");
  const examsData = exams;

  // Use the same exams data as in SubExamsListTeacher
  // const examsData = [
  //   {
  //     folder: false,
  //     name: "Biology Final Exam",
  //     slug: "biology-final-exam",
  //     date: "2024-12-18",
  //     subject: "Biology",
  //     level: "Orta",
  //     difficulty: "Orta",
  //     questions: 35,
  //     url: "/exams/biology-final",
  //   },
  //   {
  //     folder: false,
  //     name: "History Quiz",
  //     slug: "history-quiz",
  //     date: "2024-09-25",
  //     subject: "History",
  //     level: "Aşağı",
  //     difficulty: "Asan",
  //     questions: 15,
  //     url: "/exams/history-quiz",
  //   },
  // ];

  // State to manage selected exams
  //   const [selectedExams, setSelectedExams] = useState([]);

  return (
    <div>
      <ExamsListTeacher
        exams={examsData}
        viewMode={viewMode}
        sortOption={sortOption}
        selectedExams={selectedExams}
        setSelectedExams={setSelectedExams}
        openEditExamModal={openEditExamModal}
        openDeleteExamModal={openDeleteExamModal}
        showTeacherName={!!selectedCompany}
        openEditFolderModal={openEditFolderModal}
      />
    </div>
  );
}

export default ExamListCompany;
