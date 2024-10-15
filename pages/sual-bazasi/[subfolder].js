import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

function SubFolderSUallarToplusu() {
  const [subFolders, setSubFolders] = useState([]);
  // State for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState(null);

  // State for Delete Modal
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);

  const router = useRouter();
  const { subfolder } = router.query;

  const files = [
    {
      name: "Mathematics",
      slug: "mathematics",
      date: "2024-09-15",
      year: "2024",
      difficulty: "Çətin",
      level: "Orta",
      creator: "Asan",
      url: "/fayllar/mathematics",
    },
    {
      name: "Physics",
      slug: "physics",
      date: "2024-09-20",
      year: "2024",
      difficulty: "Asan",
      level: "Yüksək",
      creator: "Orta",
      url: "/fayllar/physics/",
    },
    {
      name: "Science",
      slug: "science",
      date: "2024-09-25",
      year: "2024",
      difficulty: "Orta",
      level: "Asan",
      creator: "Çətin",
      subfolder: [
        {
          name: "Chemistry",
          slug: "chemistry",
          date: "2024-09-25",
          year: "2024",
          difficulty: "Orta",
          level: "Asan",
          creator: "Çətin",
          url: "/files/chemistry.pdf",
        },
        {
          name: "Biology",
          slug: "biology",
          date: "2024-10-01",
          year: "2024",
          difficulty: "Asan",
          level: "Orta",
          creator: "Yüksək",
          url: "/files/biology.pdf",
        },
      ],
    },
    {
      name: "History",
      slug: "history",
      date: "2024-10-10",
      year: "2024",
      difficulty: "Orta",
      level: "Yüksək",
      creator: "Asan",
      url: "/files/history.pdf",
    },
    {
      name: "Geography",
      slug: "geography",
      date: "2024-10-20",
      year: "2024",
      difficulty: "Çətin",
      level: "Asan",
      creator: "Orta",
      url: "/files/geography.pdf",
    },
    {
      name: "Languages",
      slug: "languages",
      date: "2024-10-30",
      year: "2024",
      difficulty: "Asan",
      level: "Orta",
      creator: "Yüksək",
      subfolder: [
        {
          name: "English",
          slug: "english",
          date: "2024-10-30",
          year: "2024",
          difficulty: "Asan",
          level: "Orta",
          creator: "Yüksək",
          url: "/files/english.pdf",
        },
      ],
    },
    {
      name: "Frontend",
      slug: "frontend",
      date: "2024-11-05",
      year: "2024",
      difficulty: "Çətin",
      level: "Yüksək",
      creator: "Asan",
      url: "/files/frontend.pdf",
    },
    {
      name: "Art",
      slug: "art",
      date: "2024-11-15",
      year: "2024",
      difficulty: "Orta",
      level: "Asan",
      creator: "Orta",
      url: "/files/art.pdf",
    },
    {
      name: "Backend",
      slug: "backend",
      date: "2024-11-25",
      year: "2024",
      difficulty: "Asan",
      level: "Orta",
      creator: "Çətin",
      url: "/files/backend.pdf",
    },
  ];

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

  useEffect(() => {
    if (subfolder) {
      // Find the matching object from the files array
      const foundItem = files.find((file) => file.slug === subfolder);

      // If subfolder exists, set it in the state
      if (foundItem && foundItem.subfolder) {
        setSubFolders(foundItem.subfolder);
      }
    }
  }, [subfolder]);

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
      <HeaderInternal />
      <div className="flex">
        <div className="w-[20%]">
          <CompanySidebar />
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

            <QuestionsNavigationCompany
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              isCheckboxSelected={isCheckboxSelected}
              selectedFiles={selectedFiles}
              openModal={openModal}
              openDeleteModal={openDeleteModal}
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

      {/* Render the modal when isModalOpen is true */}
      {isModalOpen && <AddFolderModal closeModal={closeModal} />}
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
