// for company

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

function UmumiImtahanlar() {
  const [folders, setFolders] = useState([]);

  const { selectedCompany } = useContext(CompanyContext);
  // console.log(selectedCompany.id, "selectedCompany umumi");
  

  // Fetch folders from the API
  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "Token");
      console.log(selectedCompany?.id, "selectedCompany ID");

      // Proceed only if token and selectedCompany.id are valid
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
        console.log(response.data.data, "Fetched folders data");
        setFolders(response.data.data);
      } else {
        console.error("Token or Company ID is missing");
      }
    } catch (error) {
      if (error.response) {
        // console.error("Error fetching folders:", error.response.data);
        console.error("Status:", error.response.status);
        // console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error with the request:", error.request);
      } else {
        console.error("General error message:", error.message);
      }
    }
  };


  useEffect(() => {
    fetchFolders();
  }, [selectedCompany]);

  const addNewFolder = (newFolder) => {
    setFolders((prevFolders) => [...prevFolders, newFolder]);
    fetchFolders()
    // Removed fetchFolders to avoid unnecessary re-fetching
  };
  const closeModal = () => {
    setIsModalOpen(false);
  
  };

  const updateFolder = (updatedFolder) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === updatedFolder.id ? updatedFolder : folder
      )
    );
  };
  
  const deleteFolder = (folderId) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId));
  };

  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const openDeleteExamModal = (item) => {
    setSelectedExam(item); // Set the item (exam or folder) to delete
    setIsDeleteModalOpen(true);
  };
  
  return (
    <>
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        <OwnerDashboardHeader />
      </div>
      <div className="flex">
        <div className="hidden lg:block md:w-[20%]">
          <CompanySidebar />
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
            <ExamListCompany
              exams={folders}
              viewMode={viewMode}
              sortOption={sortOption}
              selectedExams={selectedExams}
              setSelectedExams={setSelectedExams}
              openEditExamModal={openEditExamModal}
              openDeleteExamModal={openDeleteExamModal}

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
          closeModal={closeModal} 
          onDelete={() => {
            // Handle delete action
            closeDeleteModal();
          }}
        />
      )}
      {isModalOpen && (
        <AddExamFolderModal
          closeModal={() => setIsModalOpen(false)}
          addNewFolder={addNewFolder}

        />
      )}
      {/* Place DeleteModal rendering here */}
      {isDeleteModalOpen && (
        <DeleteExamModal
          item={selectedExam} // Pass the selected exam or folder to delete
          onCancel={closeDeleteModal} 
          closeModal={closeModal} 
          onDelete={() => {
            // Call deleteFolder or deleteExam based on item type
            if (selectedExam.type === "folder") {
              deleteFolder(selectedExam.id);
            } else {
              deleteExam(selectedExam.id);
            }
            closeDeleteModal();
          }}
        />
      )}
    </>
  );
}

export default UmumiImtahanlar;
