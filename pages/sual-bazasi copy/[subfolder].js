import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanyQuestionsNav from "@/components/CompanyQuestionsNav";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import AddFolderModal from "@/components/AddFolderModal";
import DeleteModal from "@/components/DeleteModal";
import SubFolderCard from "@/components/SubFolderCard";
import EditFolderModal from "@/components/EditFolderModal";
import QuestionsNavigationCompany from "@/components/QuestionsNavigationCompany";
import { UserContext } from "@/shared/context/UserContext";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import TeacherSidebar from "@/components/TeacherSidebar";
import axios from "axios";
import SuallarTableNavigationTitle from "@/components/SuallarTableNavigationTitle";
import CreateSubFolderOrQuestion from "@/components/CreateSubFolderOrQuestion";
import AddSubFolderModal from "@/components/AddSubFolderModal";

function SubFolderSUallarToplusu() {
  const { user } = useContext(UserContext);
  const [subFolders, setSubFolders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // State for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState(null);

  // State for Delete Modal
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const addNewSubFolder = (newSubFolder) => {
    setSubFolders((prevSubFolders) => [...prevSubFolders, newSubFolder]);
  };
  const router = useRouter();
  const { subfolder } = router.query;

  const handleDelete = () => {
    // Open the delete modal
    setIsDeleteModalOpen(true);
  };

  const handleEdit = () => {
    // Open the edit modal
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here
    // console.log("Delete selected rows:", selectedRows);
    setIsDeleteModalOpen(false); // Close modal after deletion
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete modal without deletion
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Close the edit modal
  };
  useEffect(() => {
    const fetchSubFolders = async () => {
      // Get token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        const response = await axios.get(
          `https://innocert-admin.markup.az/api/questions/folder/${subfolder}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if data exists and if folders property is present
        if (response.data && response.data.data && response.data.data.folders) {
          setSubFolders(response.data.data.folders);
        } else {
          console.error("No folders found in the response:", response.data);
          setSubFolders([]); // Set to an empty array if no folders found
        }
      } catch (error) {
        console.error("Error fetching subfolders:", error);
      }
    };

    if (subfolder) {
      fetchSubFolders();
    }
  }, [subfolder]);

  // Function to handle editing a folder
  const handleEditFolder = (folder) => {
    setFolderToEdit(folder);
    setIsEditModalOpen(true);
  };

  // Function to handle deleting a folder
  const handleDeleteFolder = (folder) => {
    setFolderToDelete(folder);
    setIsDeleteFolderModalOpen(true);
  };

  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Track selected files
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal

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
        {user?.data.roles === "Teacher" && <TeacherDashboardHeader />}
        {user?.data.roles === "Owner" && <OwnerDashboardHeader />}
      </div>
      <div className="flex">
        <div className="hidden lg:block md:w-[20%]">
          {user?.data.roles === "Teacher" && <TeacherSidebar />}
          {user?.data.roles === "Owner" && <CompanySidebar />}
        </div>

        <div className="w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            {/* <CompanyQuestionsNav
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              isCheckboxSelected={isCheckboxSelected}
              selectedFiles={selectedFiles}
              openModal={openModal}
              openDeleteModal={openDeleteModal}
            /> */}

            <SuallarTableNavigationTitle
              selectedRows={selectedRows}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />

            {/* Render the SubFolderCard component and pass necessary props */}
            <SubFolderCard
              subFolders={subFolders}
              viewMode={viewMode}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              openEditFolderModal={handleEditFolder}
              openDeleteFolderModal={handleDeleteFolder}
            />
          </InternalContainer>
        </div>
      </div>
      {/* Render the edit folder modal when isEditModalOpen is true */}
      {isEditModalOpen && (
        <EditFolderModal
          folder={folderToEdit}
          closeModal={() => setIsEditModalOpen(false)}
          // Pass any other necessary props
        />
      )}

      {/* Render the delete folder modal when isDeleteFolderModalOpen is true */}
      {isDeleteFolderModalOpen && (
        <DeleteModal
          folder={folderToDelete}
          onCancel={() => setIsDeleteFolderModalOpen(false)}
          onDelete={() => {
            // Handle delete action
            // Remove folder from state or make API call
            setIsDeleteFolderModalOpen(false);
          }}
        />
      )}

      {isEditModalOpen && (
        <CreateSubFolderOrQuestion closeModal={handleCloseEditModal} />
      )}

      {/* Render the modal when isModalOpen is true */}
      {isModalOpen && <AddSubFolderModal closeModal={closeModal} />}
      {/* Render the delete modal when isDeleteModalOpen is true */}
      {isDeleteModalOpen && (
        <DeleteModal
          onCancel={closeDeleteModal}
          onDelete={() => {
            /* handle delete action */ closeDeleteModal();
          }}
        />
      )}
    </>
  );
}

export default SubFolderSUallarToplusu;
