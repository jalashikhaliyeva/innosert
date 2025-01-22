// [...slug].jsx
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
import DeleteExamModal from "@/components/DeleteExamModal"; // Correct modal import
import EditExamModal from "@/components/EditExamModal";
import axios from "axios";
import CompanyContext from "@/shared/context/CompanyContext";
import ExamListCompany from "@/components/ExamsListCompany";
import ExamsListNavigationTeacher from "@/components/ExamsListNavigationTeacher";
import AddExamModal from "@/components/AddExamModal";
import { UserContext } from "@/shared/context/UserContext";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import CompanySidebar from "@/components/CompanySidebar";
import EditExamFolderModal from "@/components/EditExamFolderModal"; // Ensure this import exists
import { getSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // 1) If there's no NextAuth session, not logged in => redirect to '/'
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 2) We do a server-side fetch to check if the user is verified
  //    Usually you'd pass the user's token from session.accessToken or similar.
  const userResponse = await fetch(
    "https://innocert-admin.markup.az/api/user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`, // or wherever your token is
      },
    }
  );

  if (!userResponse.ok) {
    // If the fetch fails, treat it like "not verified"
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userData = await userResponse.json();

  // 3) If user is unverified => redirect to '/', or /haqqimizda
  if (userData?.data?.sv === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 4) If everything's OK, let them proceed
  return {
    props: {
      // pass anything you want to the component
      userBalance: userData?.data?.balance || 0,
    },
  };
}
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
  const [selectedExamsToDelete, setSelectedExamsToDelete] = useState([]); // New state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

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

  // Handler to open delete modal with selected exams
  const openDeleteMultipleModal = () => {
    setSelectedExamsToDelete(selectedExams);
    setIsDeleteModalOpen(true);
  };

  // **Define openEditFolderModal Here**
  const openEditFolderModal = (folder) => {
    setSelectedFolder(folder);
    setIsEditFolderModalOpen(true);
  };

  const closeEditFolderModal = () => {
    setSelectedFolder(null);
    setIsEditFolderModalOpen(false);
  };

  // Extract the last slug segment
  const slugParam = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  // Fetch folders from the API
  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log("Token:", token);
      // console.log("Slug Param:", slugParam);

      // Proceed only if token and slugParam are valid
      if (token && slugParam && selectedCompany?.id) {
        const response = await axios.get(
          `https://innocert-admin.markup.az/api/get-exams/${slugParam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Company-ID": selectedCompany.id,
            },
          }
        );
        // console.log("Fetched sub folders data:", response.data.data);
        setFolders(response.data.data);
      } else {
        console.error("Token, Slug Param, or Company ID is missing");
        setError(
          "Authentication token, folder identifier, or company information is missing."
        );
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

  // console.log(folders, "setFolders");

  // Handlers for adding, editing, and deleting folders
  const addNewFolder = (newFolder) => {
    setFolders((prevFolders) => ({
      ...prevFolders,
      folders: [...prevFolders.folders, newFolder],
    }));
    // Optionally, you can refetch or update the state accordingly
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
    setSelectedExamsToDelete([]);
    closeDeleteModal();
  };

  useEffect(() => {
    if (router.isReady) {
      fetchFolders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, slugParam, selectedCompany]);

  if (!router.isReady) {
    return <><Spinner /></>;
  }

  if (loading) {
    return <><Spinner /></>;
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
              openDeleteModal={openDeleteMultipleModal} // Use the new handler
            />
            <ExamListCompany
              exams={folders}
              viewMode={viewMode}
              sortOption={sortOption}
              selectedExams={selectedExams}
              setSelectedExams={setSelectedExams}
              openEditExamModal={openEditExamModal}
              openDeleteExamModal={openDeleteMultipleModal} // Use the new handler
              openEditFolderModal={openEditFolderModal} // Now correctly defined
            />
          </InternalContainer>
        </div>
      </div>

      {/* Modals */}
      {isAddExamModalOpen && (
        <AddExamModal
          closeModal={closeAddExamModal}
          addNewFolder={addNewFolder}
        />
      )}
      {isEditExamModalOpen && (
        <EditExamModal exam={selectedExam} closeModal={closeEditExamModal} />
      )}
      {isEditFolderModalOpen && (
        <EditExamFolderModal
          folder={selectedFolder}
          closeModal={closeEditFolderModal}
          onFolderUpdate={updateFolder}
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

export default SubImtahan;
