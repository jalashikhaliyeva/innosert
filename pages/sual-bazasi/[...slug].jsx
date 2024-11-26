// DynamicSubFolderPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";
import InternalContainer from "@/components/InternalContainer";
import SubFolderCard from "@/components/SubFolderCard";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import TeacherSidebar from "@/components/TeacherSidebar";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import CompanyQuestionsNav from "@/components/CompanyQuestionsNav";
import EditFolderModal from "@/components/EditFolderModal";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import CreateSubFolderOrQuestion from "@/components/CreateSubFolderOrQuestion";
import QuestionsTableCompany from "@/components/QuestionsTableCompany";
import Questions from "@/components/Questions";
import { TbFolder, TbTable } from "react-icons/tb";
import { UserContext } from "@/shared/context/UserContext";
import CompanyContext from "@/shared/context/CompanyContext";
import Spinner from "@/components/Spinner";
import DeleteModal from "@/components/DeleteQuestionModal";
import BulkDeleteFolderModal from "@/components/BulkDeleteFolderModal";
const DynamicSubFolderPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { user, setLastQuery } = useContext(UserContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const { selectedCompany } = useContext(CompanyContext);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  const [subFolders, setSubFolders] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [hasSubFolders, setHasSubFolders] = useState(false);
  const [activeTab, setActiveTab] = useState("folders");
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    if (!questionToDelete) return;
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      await axios.delete(
        `https://innocert-admin.markup.az/api/questions/${questionToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Company-ID": selectedCompany.id,
          },
        }
      );

      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== questionToDelete)
      );
      setIsDeleteModalOpen(false);
      setSelectedRows((prevSelected) =>
        prevSelected.filter((id) => id !== questionToDelete)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const openDeleteModal = (id) => {
    setQuestionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    if (slug && slug.length > 0) {
      setLastQuery(slug[slug.length - 1]);
    }
  }, [slug, setLastQuery]);

  useEffect(() => {
    const fetchSubFoldersAndQuestions = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        setLoading(false);
        return;
      }

      const folderPath = slug ? slug[slug.length - 1] : "";

      try {
        const response = await axios.get(
          `https://innocert-admin.markup.az/api/questions/folder/${folderPath}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Company-ID": selectedCompany.id,
            },
          }
        );

        if (response.data?.data) {
          const { folders, questions } = response.data.data;
          setSubFolders(folders || []);
          setQuestions(questions || []);
          setHasSubFolders(folders?.length > 0);
        } else {
          setSubFolders([]);
          setQuestions([]);
          setHasSubFolders(false);
        }
      } catch (error) {
        console.error("Error fetching subfolders and questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSubFoldersAndQuestions();
    }
  }, [slug, selectedCompany]);

  const addNewSubFolder = (newSubFolder) => {
    setSubFolders((prevSubFolders) => [...prevSubFolders, newSubFolder]);
  };

  const updateFolder = (updatedFolder) => {
    setSubFolders((prevSubFolders) =>
      prevSubFolders.map((folder) =>
        folder.id === updatedFolder.id ? updatedFolder : folder
      )
    );
  };

  const deleteFolder = (folderId) => {
    setSubFolders((prevSubFolders) =>
      prevSubFolders.filter((folder) => folder.id !== folderId)
    );
  };

  const openEditFolderModal = (folder) => {
    setSelectedFolder(folder);
    setIsEditFolderModalOpen(true);
  };

  const openDeleteFolderModal = (folder) => {
    setFolderToDelete(folder);
    setIsDeleteFolderModalOpen(true);
  };

  const bulkDeleteFolders = (folderIds) => {
    setSubFolders((prevFolders) =>
      prevFolders.filter((folder) => !folderIds.includes(folder.id))
    );
    setSelectedFiles([]);
    setIsBulkDeleteModalOpen(false);
  };

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
            {isTeacher ? <TeacherDashboardHeader /> : <OwnerDashboardHeader />}
          </div>

          <div className="flex">
            <div className="hidden lg:block md:w-[20%]">
              {isTeacher ? <TeacherSidebar /> : <CompanySidebar />}
            </div>

            <div className="w-[80%]">
              <InternalContainer>
                <Breadcrumb />
                <CompanyQuestionsNav
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  openModal={() => setIsModalOpen(true)}
                  selectedFiles={selectedFiles}
                  openBulkDeleteModal={() => setIsBulkDeleteModalOpen(true)}
                />

                {!isTeacher && (
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
                )}

                {activeTab === "folders" && (
                  <>
                    {subFolders.length > 0 && (
                      <SubFolderCard
                        subFolders={subFolders}
                        viewMode={viewMode}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        openEditFolderModal={openEditFolderModal}
                        openDeleteFolderModal={openDeleteFolderModal}
                      />
                    )}

                    {questions.length > 0 && (
                      <Questions
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        questions={questions}
                        openDeleteModal={openDeleteModal}
                      />
                    )}
                  </>
                )}

                {activeTab === "questions" && (
                  <QuestionsTableCompany questions={questions} />
                )}
              </InternalContainer>
            </div>
          </div>

          {isEditFolderModalOpen && selectedFolder && (
            <EditFolderModal
              folder={selectedFolder}
              closeModal={() => setIsEditFolderModalOpen(false)}
              onFolderUpdate={updateFolder}
            />
          )}

          {isDeleteFolderModalOpen && folderToDelete && (
            <DeleteFolderModal
              folder={folderToDelete}
              closeModal={() => setIsDeleteFolderModalOpen(false)}
              onDelete={deleteFolder}
            />
          )}

          {isModalOpen && (
            <CreateSubFolderOrQuestion
              addNewSubFolder={addNewSubFolder}
              closeModal={() => setIsModalOpen(false)}
              hasSubFolders={hasSubFolders}
              hasQuestions={questions.length > 0}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteModal
              onCancel={() => setIsDeleteModalOpen(false)}
              onDelete={handleDelete}
            />
          )}
          {isBulkDeleteModalOpen && selectedFiles.length > 0 && (
            <BulkDeleteFolderModal
              folders={subFolders.filter((folder) =>
                selectedFiles.includes(folder.id)
              )}
              closeModal={() => setIsBulkDeleteModalOpen(false)}
              onDelete={bulkDeleteFolders}
            />
          )}
        </>
      )}
    </>
  );
};

export default DynamicSubFolderPage;
