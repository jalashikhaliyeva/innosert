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
