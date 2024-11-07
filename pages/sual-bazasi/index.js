import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";
import CompanyQuestionsNav from "@/components/CompanyQuestionsNav";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import QuestionFiles from "@/components/CompanyQuestionsFiles";
import AddFolderModal from "@/components/AddFolderModal";
import DeleteModal from "@/components/DeleteModal";
import EditFolderModal from "@/components/EditFolderModal";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import TeacherSidebar from "@/components/TeacherSidebar";
import QuestionsTableCompany from "@/components/QuestionsTableCompany"; // Import this component
import { UserContext } from "@/shared/context/UserContext";
import { TbFolder, TbTable } from "react-icons/tb"; // Import icons
import Spinner from "@/components/Spinner";

function SualBazasi() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("folders");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);

  // Fetch folders from the API
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://innocert-admin.markup.az/api/questions/folder/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles(response.data.data.folders);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Handlers for adding, editing, and deleting folders
  const addNewFolder = (newFolder) => {
    setFiles((prevFiles) => [...prevFiles, newFolder]);
    fetchFiles();
  };

  const updateFolder = (updatedFolder) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === updatedFolder.id ? updatedFolder : file
      )
    );
  };

  const deleteFolder = (folderId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== folderId));
  };

  // Determine if the user is a Teacher
  const isTeacher = user?.data.roles === "Teacher";

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="hidden lg:block">
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

            <div className="w-[80%]">
              <InternalContainer>
                <Breadcrumb />

                {/* Sual Toplusu (CompanyQuestionsNav) */}
                <CompanyQuestionsNav
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  selectedFiles={selectedFiles}
                  openModal={() => setIsModalOpen(true)}
                />

                {/* Conditional Rendering Based on User Role */}
                {isTeacher ? (
                  // Render only QuestionFiles for Teachers
                  <QuestionFiles
                    files={files}
                    viewMode={viewMode}
                    sortOption={sortOption}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    openEditFolderModal={(folder) => {
                      setSelectedFolder(folder);
                      setIsEditFolderModalOpen(true);
                    }}
                    openDeleteFolderModal={(folder) => {
                      setSelectedFolder(folder);
                      setIsDeleteFolderModalOpen(true);
                    }}
                  />
                ) : (
                  // Render Tabs and Conditional Components for Other Roles
                  <>
                    {/* Tab Navigation */}
                    <div className="flex flex-row gap-4 mb-6 font-gilroy mt-5 lg:mt-0">
                      <button
                        className={`flex items-center gap-2 text-base lg:text-lg px-4 py-3 rounded-lg font-normal leading-6 ${
                          activeTab === "folders"
                            ? "bg-blue100 text-blue400"
                            : "text-neutral700"
                        }`}
                        onClick={() => setActiveTab("folders")}
                      >
                        <TbFolder className="size-6" />
                        Mənim Qovluqlarım
                      </button>
                      <button
                        className={`flex items-center gap-2 text-base lg:text-lg px-4 py-3 rounded-lg font-normal leading-6 ${
                          activeTab === "questions"
                            ? "bg-blue100 text-blue400"
                            : "text-neutral700"
                        }`}
                        onClick={() => setActiveTab("questions")}
                      >
                        <TbTable className="size-6" />
                        Sual Bazası
                      </button>
                    </div>

                    {/* Conditional Rendering based on active tab */}
                    {activeTab === "folders" && (
                      <QuestionFiles
                        files={files}
                        viewMode={viewMode}
                        sortOption={sortOption}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        openEditFolderModal={(folder) => {
                          setSelectedFolder(folder);
                          setIsEditFolderModalOpen(true);
                        }}
                        openDeleteFolderModal={(folder) => {
                          setSelectedFolder(folder);
                          setIsDeleteFolderModalOpen(true);
                        }}
                      />
                    )}

                    {activeTab === "questions" && <QuestionsTableCompany />}
                  </>
                )}
              </InternalContainer>
            </div>
          </div>

          {/* Modals */}
          {isEditFolderModalOpen && (
            <EditFolderModal
              folder={selectedFolder}
              closeModal={() => setIsEditFolderModalOpen(false)}
              onFolderUpdate={updateFolder}
            />
          )}

          {isDeleteFolderModalOpen && (
            <DeleteFolderModal
              folder={selectedFolder}
              closeModal={() => setIsDeleteFolderModalOpen(false)}
              onDelete={deleteFolder}
            />
          )}

          {isModalOpen && (
            <AddFolderModal
              closeModal={() => setIsModalOpen(false)}
              addNewFolder={addNewFolder}
              fetchFiles={fetchFiles}
            />
          )}
        </>
      )}
    </>
  );
}

export default SualBazasi;
