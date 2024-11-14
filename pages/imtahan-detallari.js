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
import { useRouter } from "next/router";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";

function ImtahanDetallari() {
  const { user, examDetailsSingle , setExamToEdit } = useContext(UserContext);
  console.log(examDetailsSingle, "examDetailsSingle");

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
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        {user?.data.roles === "Teacher" && <TeacherDashboardHeader />}
        {user?.data.roles === "Owner" && <OwnerDashboardHeader />}
      </div>
      <div className="flex">
        <div className="hidden lg:block md:w-[20%]">
          {user?.data.roles === "Teacher" && <TeacherSidebar />}
          {user?.data.roles === "Owner" && <CompanySidebar />}
        </div>
        <div className="w-full md:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />
            <ExamDetailsTabGroup examDetailsSingle={examDetailsSingle}     setExamToEdit={setExamToEdit} />
          </InternalContainer>
        </div>
      </div>

      {/* Modals */}
      {isAddExamModalOpen && <AddExamModal onClose={closeAddExamModal} />}
      {isEditExamModalOpen && (
        <EditExamModal exam={selectedExam} onClose={closeEditExamModal} />
      )}
      {isDeleteModalOpen && <DeleteModal onClose={closeDeleteModal} />}
    </>
  );
}

export default ImtahanDetallari;
