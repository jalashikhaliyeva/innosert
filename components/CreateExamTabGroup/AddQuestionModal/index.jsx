import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import QuestionCard from "../QuestionCard";
import TableComponent from "../TableComponent";
import { GrFormPrevious } from "react-icons/gr";
import Questions from "@/components/Questions";
import DeleteModal from "@/components/DeleteModal";
import CompanyContext from "@/shared/context/CompanyContext";

function AddQuestionModal({ onClose }) {
  const { selectedCompany } = useContext(CompanyContext);
  const [selectedIcon, setSelectedIcon] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [currentFiles, setCurrentFiles] = useState([]);
  const [navigationStack, setNavigationStack] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState(["Qovluqlar"]);
  const [currentPath, setCurrentPath] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const dropdownRef = useRef(null);

  const fetchQuestions = async (folderPath = "") => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (selectedCompany && selectedCompany.id) {
        headers["X-Company-ID"] = selectedCompany.id;
      }

      const endpoint = folderPath
        ? `https://innocert-admin.markup.az/api/questions/folder/${folderPath}`
        : "https://innocert-admin.markup.az/api/questions/folder/";

      const response = await axios.get(endpoint, { headers });

      const fetchedFolders = response.data?.data?.folders || [];
      console.log(fetchedFolders, "fetchedFolders");

      const fetchedQuestions = response.data?.data?.questions || [];
      console.log(fetchedQuestions, "fetchedQuestions");

      setFiles(fetchedFolders);
      setQuestions(fetchedQuestions);
    } catch (err) {
      console.error("Error fetching folders or questions:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch questions on component mount and when selectedCompany changes
  useEffect(() => {
    fetchQuestions();
  }, [selectedCompany]);

  const filteredFiles = useMemo(() => {
    return files.filter((file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, files]);

  // **New useEffect: Reset breadcrumbs and navigation when searchQuery changes**
  useEffect(() => {
    if (searchQuery) {
      setNavigationStack([]);
      setBreadcrumbs(["Qovluqlar"]);
      setShowTable(false);
      setCurrentFile(null);
    }
    // No else block needed here
  }, [searchQuery]);

  // **New useEffect: Update currentFiles based on searchQuery and files**
  useEffect(() => {
    if (searchQuery) {
      setCurrentFiles(filteredFiles);
    } else {
      setCurrentFiles(files);
    }
  }, [searchQuery, filteredFiles, files]);

  const monthNamesAZ = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avqust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ];

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) {
      console.error(`Invalid date: ${dateStr}`);
      return dateStr;
    }
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthName = monthNamesAZ[monthIndex] || "";
    return `${day} ${capitalizeFirstLetter(monthName)} ${year}`;
  };

  const handleCheckboxChange = (fileUrl, isChecked) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (isChecked) {
        return [...prevSelectedFiles, fileUrl];
      } else {
        return prevSelectedFiles.filter((url) => url !== fileUrl);
      }
    });
  };

  const handleBoxClick = async (file) => {
    if (file.sub_folder && file.sub_folder.length > 0) {
      setNavigationStack((prevStack) => [...prevStack, file]);
      setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, file.name]);
      setShowTable(false);
      setCurrentFile(null);
      setQuestions([]);
      await fetchQuestions(file.slug);
    } else {
      setShowTable(true);
      setCurrentFile(file);
      setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, file.name]);
      await fetchQuestions(file.slug);
    }
  };
  const handleBack = async () => {
    if (showTable) {
      // Navigating back from the table view
      setShowTable(false);
      setCurrentFile(null);
      setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, -1));

      if (navigationStack.length > 0) {
        const currentFolder = navigationStack[navigationStack.length - 1];
        await fetchQuestions(currentFolder.slug);
      } else {
        await fetchQuestions();
      }
    } else if (navigationStack.length > 0) {
      // Navigating up the folder hierarchy
      const newStack = [...navigationStack];
      newStack.pop();
      setNavigationStack(newStack);
      setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, -1));

      if (newStack.length === 0) {
        await fetchQuestions();
      } else {
        const parentFolder = newStack[newStack.length - 1];
        await fetchQuestions(parentFolder.slug);
      }
    } else {
      // At the root level
      await fetchQuestions();
      setBreadcrumbs(["Qovluqlar"]);
      setShowTable(false);
      setCurrentFile(null);
    }
  };

  const handleBreadcrumbClick = async (index) => {
    if (index === breadcrumbs.length - 1) return;
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);

    if (index === 0) {
      setNavigationStack([]);
      await fetchQuestions();
    } else {
      const newStack = navigationStack.slice(0, index);
      setNavigationStack(newStack);
      const targetFolder = newStack[newStack.length - 1];
      await fetchQuestions(targetFolder.slug);
    }

    setShowTable(false);
    setCurrentFile(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const openDeleteModal = (id) => {
    setQuestionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg p-10 m-5 md:m-0 w-[960px] relative max-h-[790px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-20">
          <button
            onClick={onClose}
            className="absolute top-0 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
          <div className="flex items-center mb-4">
            {(navigationStack.length > 0 || showTable) && (
              <button
                onClick={handleBack}
                className="mr-2 text-textSecondaryDefault hover:underline"
              >
                <GrFormPrevious className="size-6 text-gray-500" />
              </button>
            )}
            <h2 className="text-2xl font-gilroy font-medium leading-8 text-textSecondaryDefault">
              Sual əlavə et
            </h2>
          </div>
          {breadcrumbs.length > 0 && (
            <div className="flex items-center mb-4">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                  <span
                    className={`font-gilroy ${
                      index === breadcrumbs.length - 1
                        ? "text-gray-800"
                        : "text-gray-400 cursor-pointer hover:underline"
                    }`}
                    onClick={() => handleBreadcrumbClick(index)}
                  >
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
          {!showTable && (
            <div className="mb-4 flex items-center justify-between">
              <div className="w-[70%]">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"
                        fill="#B2B2B2"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="bg-inputBgDefault hover:bg-inputBgHover w-full hover:border-inputBorderHover font-gilroy pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-inputRingFocus"
                    placeholder="Axtar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-1 border rounded-lg">
                <div
                  className={`p-1 m-1 rounded-md cursor-pointer ${
                    selectedIcon === "grid" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleIconClick("grid")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.2857 4H18.8571C19.1602 4 19.4509 4.12041 19.6653 4.33474C19.8796 4.54906 20 4.83975 20 5.14286V9.71429C20 10.0174 19.8796 10.3081 19.6653 10.5224C19.4509 10.7367 19.1602 10.8571 18.8571 10.8571H14.2857C13.9826 10.8571 13.6919 10.7367 13.4776 10.5224C13.2633 10.3081 13.1429 10.0174 13.1429 9.71429V5.14286C13.1429 4.83975 13.2633 4.54906 13.4776 4.33474C13.6919 4.12041 13.9826 4 14.2857 4ZM5.14286 4H9.71429C10.0174 4 10.3081 4.12041 10.5224 4.33474C10.7367 4.54906 10.8571 4.83975 10.8571 5.14286V9.71429C10.8571 10.0174 10.7367 10.3081 10.5224 10.5224C10.3081 10.7367 10.0174 10.8571 9.71429 10.8571H5.14286C4.83975 10.8571 4.54906 10.7367 4.33474 10.5224C4.12041 10.3081 4 10.0174 4 9.71429V5.14286C4 4.83975 4.12041 4.54906 4.33474 4.33474C4.54906 4.12041 4.83975 4 5.14286 4ZM14.2857 13.1429H18.8571C19.1602 13.1429 19.4509 13.2633 19.6653 13.4776C19.8796 13.6919 20 13.9826 20 14.2857V18.8571C20 19.1602 19.8796 19.4509 19.6653 19.6653C19.4509 19.8796 19.1602 20 18.8571 20H14.2857C13.9826 20 13.6919 19.8796 13.4776 19.6653C13.2633 19.4509 13.1429 19.1602 13.1429 18.8571V14.2857C13.1429 13.9826 13.2633 13.6919 13.4776 13.4776C13.6919 13.2633 13.9826 13.1429 14.2857 13.1429ZM5.14286 13.1429H9.71429C10.0174 13.1429 10.3081 13.2633 10.5224 13.4776C10.7367 13.6919 10.8571 13.9826 10.8571 14.2857V18.8571C10.8571 19.1602 10.7367 19.4509 10.5224 19.6653C10.3081 19.8796 10.0174 20 9.71429 20H5.14286C4.83975 20 4.54906 19.8796 4.33474 19.6653C4.12041 19.4509 4 19.1602 4 18.8571V14.2857C4 13.9826 4.12041 13.6919 4.33474 13.4776C4.54906 13.2633 4.83975 13.1429 5.14286 13.1429Z"
                      stroke="#000A33"
                      strokeWidth="1.14286"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className={`p-1 m-1 rounded-md cursor-pointer ${
                    selectedIcon === "list" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleIconClick("list")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 7H20M4 12H20M4 17H20"
                      stroke="#000A33"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {!showTable ? (
            <div className="py-6 overflow-auto max-h-[400px]">
              {loading ? (
                <div className="text-center text-gray-500">Yüklənir...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : (
                <div
                  className={
                    selectedIcon === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                      : "flex flex-col gap-3"
                  }
                >
                  {currentFiles.map((file, index) => (
                    <QuestionCard
                      key={file.slug || index}
                      file={file}
                      viewMode={selectedIcon}
                      selectedFiles={selectedFiles}
                      handleCheckboxChange={handleCheckboxChange}
                      handleBoxClick={handleBoxClick}
                      index={index}
                      dropdownVisible={dropdownVisible}
                      setDropdownVisible={setDropdownVisible}
                      formatDate={formatDate}
                      dropdownRef={dropdownRef}
                      showActions={true}
                    />
                  ))}
                </div>
              )}

              {/* Render <TableComponent> when there are no subfolders or during search */}
              {!loading && !error && currentFiles.length === 0 && (
                <TableComponent
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  questions={questions}
                  openDeleteModal={openDeleteModal}
                  showActionButtons={true}
                />
              )}
            </div>
          ) : (
            <div className="">
              {/* When showTable is true, display <TableComponent> */}
              <TableComponent
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                questions={questions}
                openDeleteModal={openDeleteModal}
                showActionButtons={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => {
            // Implement delete functionality here
            setIsDeleteModalOpen(false);
          }}
          questionId={questionToDelete}
        />
      )}
    </div>
  );
}

export default AddQuestionModal;
