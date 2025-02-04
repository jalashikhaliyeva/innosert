// Teacher

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanyQuestionsNav from "@/components/CompanyQuestionsNav";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import QuestionFiles from "@/components/CompanyQuestionsFiles";
import AddFolderModal from "@/components/AddFolderModal"; // Import the modal
import DeleteModal from "@/components/DeleteModal";
import EditFolderModal from "@/components/EditFolderModal";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import TeacherSidebar from "@/components/TeacherSidebar";
import QuestionFilesTeacher from "@/components/QuestionFilesTeacher";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";
import { getSession } from "next-auth/react";
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
    "https://api.innosert.az/api/user",
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
function SuallarToplusu() {
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Track selected files
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const openEditFolderModal = (folder) => {
    setSelectedFolder(folder);
    setIsEditFolderModalOpen(true);
  };

  const closeEditFolderModal = () => {
    setIsEditFolderModalOpen(false);
  };

  const openDeleteFolderModal = (folder) => {
    setSelectedFolder(folder);
    setIsDeleteFolderModalOpen(true);
  };

  const closeDeleteFolderModal = () => {
    setIsDeleteFolderModalOpen(false);
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Function to open the delete modal
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // Function to close the delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

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
            <CompanyQuestionsNav
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              isCheckboxSelected={isCheckboxSelected}
              selectedFiles={selectedFiles}
              openModal={openModal} // Pass openModal function
              openDeleteModal={openDeleteModal} // Modal for deleting
            />
            <QuestionFilesTeacher
              viewMode={viewMode}
              sortOption={sortOption}
              selectedFiles={selectedFiles} // Pass the selected files array
              setSelectedFiles={setSelectedFiles} // Pass the function to update selected files
              openEditFolderModal={openEditFolderModal} // Pass the function
              openDeleteFolderModal={openDeleteFolderModal} // Pass the function
            />
          </InternalContainer>
        </div>
      </div>
      {isEditFolderModalOpen && (
        <EditFolderModal
          folder={selectedFolder}
          closeModal={closeEditFolderModal}
        />
      )}
      {isDeleteFolderModalOpen && (
        <DeleteFolderModal
          folder={selectedFolder}
          closeModal={closeDeleteFolderModal}
        />
      )}

      {/* Render the modal when isModalOpen is true */}
      {isModalOpen && <AddFolderModal closeModal={closeModal} />}
      {/* Render the delete modal when isDeleteModalOpen is true */}
      {isDeleteModalOpen && (
        <DeleteModal
          onCancel={closeDeleteModal} // Correct function
          onDelete={() => {
            // Handle the delete action
            // For example, remove the folder from your state or make an API call
            closeDeleteModal(); // Correct function
          }}
        />
      )}
    </>
  );
}

export default SuallarToplusu;
