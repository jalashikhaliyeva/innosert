import React, { useContext, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import TeacherSidebar from "@/components/TeacherSidebar";
import CompanySidebar from "@/components/CompanySidebar"; 
import AddExamModal from "@/components/AddExamModal";
import DeleteModal from "@/components/DeleteModal";
import EditExamModal from "@/components/EditExamModal";
import ExamDetailsTabGroup from "@/components/ExamDetailsTabGroup";
import { UserContext } from "@/shared/context/UserContext";
import { useRouter } from 'next/router';

function ImtahanDetallari() {
  const { user } = useContext(UserContext); 
  // console.log(user.data.roles, "user imtahan detallari");
  const router = useRouter(); 
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
      <HeaderInternal />
      <div className="flex">
        <div className="w-[20%]">
        {user?.data.roles === "Teacher" && <TeacherSidebar />}
        {user?.data.roles === "Owner" && <CompanySidebar />}
        </div>
        <div className="w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <ExamDetailsTabGroup />
          </InternalContainer>
        </div>
      </div>

      {/* Modals */}
      {isAddExamModalOpen && <AddExamModal onClose={closeAddExamModal} />}
      {isEditExamModalOpen && <EditExamModal exam={selectedExam} onClose={closeEditExamModal} />}
      {isDeleteModalOpen && <DeleteModal onClose={closeDeleteModal} />}
    </>
  );
}

export default ImtahanDetallari;
