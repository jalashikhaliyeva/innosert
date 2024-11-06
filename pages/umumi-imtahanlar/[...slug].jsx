// [...slug].js
import React, { useEffect, useState, useContext } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import TeacherSidebar from "@/components/TeacherSidebar";
import { useRouter } from "next/router";
import SubExamsListTeacher from "@/components/SubExamsListTeacher";
import SubExamsListNavigationTeacher from "@/components/SubExamsListNavigationTeacher";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";
import AddExamSubFolderModal from "@/components/AddExamSubFolderModal"; // Updated import
import DeleteModal from "@/components/DeleteModal";
import EditExamModal from "@/components/EditExamModal";
import axios from "axios";
import CompanyContext from "@/shared/context/CompanyContext";
import ExamListCompany from "@/components/ExamsListCompany";
import ExamsListNavigationTeacher from "@/components/ExamsListNavigationTeacher";
import AddExamModal from "@/components/AddExamModal";
import { UserContext } from "@/shared/context/UserContext";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import CompanySidebar from "@/components/CompanySidebar";

function SubImtahan() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { slug } = router.query;

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { selectedCompany } = useContext(CompanyContext);

  // Modal States
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  const [selectedExams, setSelectedExams] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  // Handlers for modals
  const openAddExamModal = () => setIsAddExamModalOpen(true);
  const closeAddExamModal = () => setIsAddExamModalOpen(false);

  const openEditExamModal = (exam) => {
    setSelectedExam(exam);
    setIsEditExamModalOpen(true);
  };
  const closeEditExamModal = () => setIsEditExamModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // Extract the last slug segment
  const slugParam = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  // Fetch folders from the API
  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      console.log("Slug Param:", slugParam);

      // Proceed only if token and slugParam are valid
      if (token && slugParam) {
        const response = await axios.get(
          `https://innocert-admin.markup.az/api/get-exams/${slugParam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Company-ID": selectedCompany.id,
            },
          }
        );
        console.log("Fetched sub folders data:", response.data.data);
        setFolders(response.data.data);
      } else {
        console.error("Token or Slug Param is missing");
        setError("Authentication token or folder identifier is missing.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Status:", error.response.status);
        setError(`Error: ${error.response.statusText}`);
      } else if (error.request) {
        console.error("Error with the request:", error.request);
        setError("Network error. Please try again.");
      } else {
        console.error("General error message:", error.message);
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handlers for adding, editing, and deleting folders
  // const addNewFolder = (newFolder) => {
  //   setFolders((prevFolders) => [...prevFolders, newFolder]);
  //   fetchFolders();
  // };

  const updateFolder = (updatedFolder) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === updatedFolder.id ? updatedFolder : folder
      )
    );
  };

  const deleteFolder = (folderId) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== folderId)
    );
  };

  useEffect(() => {
    if (router.isReady) {
      fetchFolders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, slugParam]);

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading folders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block lg:hidden">
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
              openDeleteExamModal={openDeleteModal}
            />
          </InternalContainer>
        </div>
      </div>

      {/* Modals */}
      {isAddExamModalOpen && (
        // <AddExamSubFolderModal
        //   closeModal={closeAddExamModal}
        //   // addNewFolder={addNewFolder}
        //   slugParam={slugParam} // Passing the slugParam as a prop
        // />
        <AddExamModal closeModal={closeAddExamModal} />
      )}
      {isEditExamModalOpen && (
        <EditExamModal exam={selectedExam} closeModal={closeEditExamModal} />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          onCancel={closeDeleteModal}
          onDelete={() => {
            // Handle delete action here, possibly using selectedExams
            closeDeleteModal();
          }}
        />
      )}
      {/* If you need AddExamFolderModal, ensure it's included similarly */}
    </>
  );
}

export default SubImtahan;
