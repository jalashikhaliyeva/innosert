import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import TeacherSidebar from "@/components/TeacherSidebar";
import ExamsListNavigationTeacher from "@/components/ExamsListNavigationTeacher";
import ExamsListTeacher from "@/components/ExamsListTeacher";
import AddExamModal from "@/components/AddExamModal";
import DeleteModal from "@/components/DeleteModal";
import EditExamModal from "@/components/EditExamModal";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";

function ImtahanlarSiyahisi() {
  const exams = [
    {
      folder: true,
      name: "Mathematics Exams",
      slug: "mathematics-exams",
      date: "2024-10-20",
      exams: [
        {
          name: "Midterm",
          slug: "midterm-exam",
          date: "2024-10-01",
          subject: "Mathematics",
          level: "Orta",
          difficulty: "Asan",
          questions: 20,
          url: "/exams/midterm",
        },
        {
          name: "Pre Exam",
          slug: "final-exam",
          date: "2024-11-15",
          subject: "Mathematics",
          level: "Yüksək",
          difficulty: "Çətin",
          questions: 50,
          url: "/exams/final",
        },
      ],
    },
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
      folder: true,
      name: "Biology Exams",
      slug: "biology-exams",
      date: "2024-12-20",
      exams: [
        {
          name: "Midterm Exam",
          slug: "midterm-biology-exam",
          date: "2024-10-05",
          subject: "Biology",
          level: "Orta",
          difficulty: "Asan",
          questions: 25,
          url: "/exams/biology-midterm",
        },
        {
          name: "Final Exam",
          slug: "final-biology-exam",
          date: "2024-12-10",
          subject: "Biology",
          level: "Yüksək",
          difficulty: "Çətin",
          questions: 50,
          url: "/exams/biology-final",
        },
      ],
    },
    {
      folder: true,
      name: "Frontend",
      slug: "frontend-exams",
      date: "2023-12-23",
      exams: [
        {
          name: "Final ",
          slug: "final-frontend-exam",
          date: "2024-10-05",
          subject: "Frontend",
          level: "Orta",
          difficulty: "Asan",
          questions: 45,
          url: "/exams/frontend-final",
        },
      ],
    },
  ];

  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  const [selectedExams, setSelectedExams] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const openAddExamModal = () => setIsAddExamModalOpen(true);
  const closeAddExamModal = () => setIsAddExamModalOpen(false);

  const openEditExamModal = (exam) => {
    setSelectedExam(exam);
    setIsEditExamModalOpen(true);
  };
  const closeEditExamModal = () => setIsEditExamModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <>
    <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        <TeacherDashboardHeader />
      </div>
      <div className="flex">
      <div className="hidden lg:block md:w-[20%]">
          <TeacherSidebar />
        </div>
        <div className="w-full md:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />
            <ExamsListNavigationTeacher
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              selectedExams={selectedExams}
              openAddExamModal={openAddExamModal}
              openDeleteModal={openDeleteModal}
            />
            <ExamsListTeacher
              exams={exams}
              viewMode={viewMode}
              sortOption={sortOption}
              selectedExams={selectedExams}
              setSelectedExams={setSelectedExams}
              openEditExamModal={openEditExamModal}
              openDeleteExamModal={openDeleteModal}
            />
          </InternalContainer>
        </div>
      </div>

      {isAddExamModalOpen && <AddExamModal closeModal={closeAddExamModal} />}
      {isEditExamModalOpen && (
        <EditExamModal exam={selectedExam} closeModal={closeEditExamModal} />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          onCancel={closeDeleteModal}
          onDelete={() => {
            // Handle delete action
            closeDeleteModal();
          }}
        />
      )}
    </>
  );
}

export default ImtahanlarSiyahisi;
