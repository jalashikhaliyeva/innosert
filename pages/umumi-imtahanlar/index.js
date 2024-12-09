import React, { useContext, useEffect, useState } from "react";
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
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import CompanySidebar from "@/components/CompanySidebar";
import ExamListCompany from "@/components/ExamsListCompany";
import AddExamFolderModal from "@/components/AddExamFolderModal";
import axios from "axios";
import CompanyContext from "@/shared/context/CompanyContext";
import DeleteExamModal from "@/components/DeleteExamModal";
import EditExamFolderModal from "@/components/EditExamFolderModal";
import { UserContext } from "@/shared/context/UserContext";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If there is no NextAuth session, redirect to the index page
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // If session exists, proceed with the page rendering
  return {
    props: {
      // You can pass any additional props here
    },
  };
}
function UmumiImtahanlar() {
  const { user } = useContext(UserContext);
  const [folders, setFolders] = useState([]);
  const [selectedExamsToDelete, setSelectedExamsToDelete] = useState([]);
  const { t } = useTranslation();
  const { selectedCompany } = useContext(CompanyContext);
  const openDeleteMultipleModal = () => {
    setSelectedExamsToDelete(selectedExams);
    setIsDeleteModalOpen(true);
  };

  // Fetch folders from the API
  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && selectedCompany?.id) {
        const response = await axios.get(
          "https://innocert-admin.markup.az/api/get-exams",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Company-ID": selectedCompany.id,
            },
          }
        );
        setFolders(response.data.data);
        console.log(response.data.data, "response.data.data");
      } else {
        console.error("Token or Company ID is missing");
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [selectedCompany]);

  const addNewFolder = (newFolder) => {
    setFolders((prevFolders) => ({
      ...prevFolders,
      folders: [...prevFolders.folders, newFolder],
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateFolder = (updatedFolder) => {
    setFolders((prevFolders) => ({
      ...prevFolders,
      folders: prevFolders.folders.map((folder) =>
        folder.id === updatedFolder.id ? updatedFolder : folder
      ),
    }));
  };

  const deleteFolder = (folderId) => {
    setFolders((prevFolders) => ({
      ...prevFolders,
      folders: prevFolders.folders.filter((folder) => folder.id !== folderId),
    }));
  };

  const deleteExam = (examId) => {
    setFolders((prevFolders) => ({
      ...prevFolders,
      exams: prevFolders.exams.filter((exam) => exam.id !== examId),
    }));
  };

  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  const [selectedExams, setSelectedExams] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const openEditFolderModal = (folder) => {
    setSelectedFolder(folder);
    setIsEditFolderModalOpen(true);
  };
  const closeEditFolderModal = () => {
    setSelectedFolder(null);
    setIsEditFolderModalOpen(false);
  };
  const handleFolderUpdate = (updatedFolder) => {
    setFolders((prevFolders) => ({
      ...prevFolders,
      folders: prevFolders.folders.map((folder) =>
        folder.id === updatedFolder.id ? updatedFolder : folder
      ),
    }));
  };

  const openAddExamModal = () => setIsAddExamModalOpen(true);
  const closeAddExamModal = () => setIsAddExamModalOpen(false);

  const openEditExamModal = (exam) => {
    setSelectedExam(exam);
    setIsEditExamModalOpen(true);
  };
  const closeEditExamModal = () => setIsEditExamModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openDeleteExamModal = (item) => {
    setSelectedExamsToDelete([item]); // Set the item (exam or folder) to delete
    setIsDeleteModalOpen(true);
  };

  const deleteSelectedItems = (deletedItemIds) => {
    // Remove the deleted items from the folders state
    setFolders((prevFolders) => {
      const updatedFolders = { ...prevFolders };
      // Remove deleted exams
      if (updatedFolders.exams) {
        updatedFolders.exams = updatedFolders.exams.filter(
          (exam) => !deletedItemIds.includes(exam.id)
        );
      }
      // Remove deleted folders
      if (updatedFolders.folders) {
        updatedFolders.folders = updatedFolders.folders.filter(
          (folder) => !deletedItemIds.includes(folder.id)
        );
      }
      return updatedFolders;
    });
    // Clear selectedExams and close modal
    setSelectedExams([]);
    closeDeleteModal();
  };

  return (
    <>
      <Head>
        <title>{t("navigation.exams")}</title>
      </Head>
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block lg:hidden">
        {user?.data.roles === "Teacher" && <TeacherDashboardHeader />}
        {user?.data.roles === "Owner" && <OwnerDashboardHeader />}
      </div>
      <div className="flex">
        <div className="hidden lg:block lg:w-[20%]">
          {user?.data.roles === "Teacher" && <TeacherSidebar />}
          {user?.data.roles === "Owner" && <CompanySidebar />}
        </div>
        <div className="w-full lg:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />
            <ExamsListNavigationTeacher
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              selectedExams={selectedExams}
              openAddExamModal={openAddExamModal}
              openDeleteModal={openDeleteMultipleModal}
            />
            {folders.length === 0 ||
            (!folders.folders?.length && !folders.exams?.length) ? (
              <div className="text-center text-gray-500 mt-10 font-gilroy text-lg">
                {t("noExamsAvailable", {
                  defaultValue: "No exams or folders available.",
                })}
              </div>
            ) : (
              <ExamListCompany
                exams={folders}
                viewMode={viewMode}
                sortOption={sortOption}
                selectedExams={selectedExams}
                setSelectedExams={setSelectedExams}
                openEditExamModal={openEditExamModal}
                openDeleteExamModal={openDeleteExamModal}
                openEditFolderModal={openEditFolderModal}
              />
            )}
          </InternalContainer>
        </div>
      </div>

      {isAddExamModalOpen && (
        <AddExamModal
          addNewFolder={addNewFolder}
          closeModal={closeAddExamModal}
        />
      )}
      {isEditExamModalOpen && (
        <EditExamModal exam={selectedExam} closeModal={closeEditExamModal} />
      )}

      {isModalOpen && (
        <AddExamFolderModal
          closeModal={() => setIsModalOpen(false)}
          addNewFolder={addNewFolder}
        />
      )}
      {isEditFolderModalOpen && (
        <EditExamFolderModal
          folder={selectedFolder}
          closeModal={closeEditFolderModal}
          onFolderUpdate={handleFolderUpdate}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteExamModal
          selectedItems={selectedExamsToDelete}
          onDelete={deleteSelectedItems}
          onCancel={closeDeleteModal}
        />
      )}
    </>
  );
}

export default UmumiImtahanlar;
