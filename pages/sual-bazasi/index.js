// SualBazasi.jsx
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
import QuestionsTableCompany from "@/components/QuestionsTableCompany";
import { UserContext } from "@/shared/context/UserContext";
import { TbFolder, TbTable } from "react-icons/tb";
import Spinner from "@/components/Spinner";
import { useTranslation } from "react-i18next";
import BulkDeleteFolderModal from "@/components/BulkDeleteFolderModal";
import Head from "next/head";
import CompanyContext from "@/shared/context/CompanyContext";
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
function SualBazasi() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("folders");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false); // New state for bulk delete
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { selectedCompany } = useContext(CompanyContext);
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
            "X-Company-ID": selectedCompany.id,
          },
        }
      );

      console.log(response.data ,"folders");
      
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
    // No need to fetch again if you already added the folder
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

  const bulkDeleteFolders = (folderIds) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => !folderIds.includes(file.id))
    );
    setSelectedFiles([]);
  };

  // Functions to open modals
  const openDeleteFolderModal = (folder) => {
    setSelectedFolder(folder);
    setIsDeleteFolderModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(true);
  };

  // Determine if the user is a Teacher
  const isTeacher = user?.data.roles === "Teacher";

  return (
    <>
      <Head>
        <title>{t("navigation.questionBank")}</title>
      </Head>
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
            <div className="hidden lg:block lg:w-[20%]">
              {user?.data.roles === "Teacher" && <TeacherSidebar />}
              {user?.data.roles === "Owner" && <CompanySidebar />}
            </div>

            <div className="w-full lg:w-[80%]">
              <InternalContainer>
                <Breadcrumb />

                {/* Sual Toplusu (CompanyQuestionsNav) */}
                <CompanyQuestionsNav
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  selectedFiles={selectedFiles}
                  openDeleteFolderModal={openDeleteFolderModal}
                  activeTab={activeTab}

                  openModal={() => setIsModalOpen(true)}
                  openBulkDeleteModal={openBulkDeleteModal} // Pass the bulk delete function
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
                    openDeleteFolderModal={openDeleteFolderModal}
                  />
                ) : (
                  // Render Tabs and Conditional Components for Other Roles
                  <>
                    {/* Tab Navigation */}
                    <div className="flex flex-row gap-1 mb-6 font-gilroy mt-5 lg:mt-0">
                      <button
                        className={`flex items-center gap-2 md:gap-4 text-base lg:text-lg px-4 py-3 rounded-lg font-normal leading-6 ${
                          activeTab === "folders"
                            ? "bg-blue100 text-blue400"
                            : "text-neutral700"
                        }`}
                        onClick={() => setActiveTab("folders")}
                      >
                        <TbFolder className="size-6" />
                        {t("navigation.myFolders")}
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
                        {t("navigation.questionBank")}
                      </button>
                    </div>

                    {/* Conditional Rendering based on active tab */}
                    {activeTab === "folders" &&
                      (files.length === 0 ? (
                        <div className="flex items-center font-gilroy justify-center h-full text-gray-500 text-lg">
                          {t("info.noFoldersYet")}
                        </div>
                      ) : (
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
                          openDeleteFolderModal={openDeleteFolderModal}
                        />
                      ))}

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

          {isDeleteFolderModalOpen && selectedFolder && (
            <DeleteFolderModal
              folder={selectedFolder}
              closeModal={() => setIsDeleteFolderModalOpen(false)}
              onDelete={deleteFolder}
            />
          )}

          {isBulkDeleteModalOpen && selectedFiles.length > 0 && (
            <BulkDeleteFolderModal
              folders={selectedFiles}
              closeModal={() => setIsBulkDeleteModalOpen(false)}
              onDelete={bulkDeleteFolders}
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
