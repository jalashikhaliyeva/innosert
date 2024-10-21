// components/AddQuestionModal.jsx

import React, { useState, useRef, useEffect, useMemo } from "react";
import QuestionCard from "../QuestionCard";
import TableComponent from "../TableComponent"; // Ensure this component exists
import { GrFormPrevious } from "react-icons/gr";

// Files array with ISO date format (moved outside the component)
const files = [
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

function AddQuestionModal({ onClose }) {
  const [selectedIcon, setSelectedIcon] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [currentFiles, setCurrentFiles] = useState([]);
  const [navigationStack, setNavigationStack] = useState([]); // Now stores objects with folderName and files
  const [showTable, setShowTable] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]); // Initialize as empty array
  const [currentPath, setCurrentPath] = useState([]);
  const dropdownRef = useRef(null);

  // Function to handle clicks outside the modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal if the overlay (background) is clicked
    }
  };

  // Function to handle icon click
  const handleIconClick = (icon) => {
    setSelectedIcon(icon); // Set selected view mode
  };

  // Filter files based on search query
  const filteredFiles = useMemo(() => {
    return files.filter((file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Initialize currentFiles with filteredFiles whenever searchQuery changes
  useEffect(() => {
    setCurrentFiles(filteredFiles);
    // Reset navigation stack, breadcrumbs, and table view when search query changes
    setNavigationStack([]);
    setBreadcrumbs([]); // Start with empty breadcrumbs
    setShowTable(false);
    setCurrentFile(null);
  }, [searchQuery, filteredFiles]);

  // Implement the formatDate function
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

    // Validate the date
    if (isNaN(date)) {
      console.error(`Invalid date: ${dateStr}`);
      return dateStr; // Return the original string if invalid
    }

    const day = date.getDate();
    const monthIndex = date.getMonth(); // 0-based index
    const year = date.getFullYear();

    const monthName = monthNamesAZ[monthIndex] || "";

    const formattedDate = `${day} ${capitalizeFirstLetter(monthName)} ${year}`;

    return formattedDate;
  };

  // Handle checkbox change
  const handleCheckboxChange = (fileUrl, isChecked) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (isChecked) {
        return [...prevSelectedFiles, fileUrl]; // Add the file URL when checked
      } else {
        return prevSelectedFiles.filter((url) => url !== fileUrl); // Remove the file URL when unchecked
      }
    });
  };

  const handleBoxClick = (file) => {
    if (file.subfolder) {
      // Push the folder onto currentPath
      setCurrentPath((prevPath) => [...prevPath, file]);
      // Update current files to subfolder
      setCurrentFiles(file.subfolder);
      // Update breadcrumbs
      setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, file.name]);
    } else {
      // It's a leaf node; display the table component
      setShowTable(true);
      setCurrentFile(file);
      // Update breadcrumbs
      setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, file.name]);
    }
  };

  const handleBack = () => {
    if (showTable) {
      // If currently showing table, just hide it
      setShowTable(false);
      setCurrentFile(null);
      // Remove the last breadcrumb (file name)
      setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, -1));
    } else if (currentPath.length > 0) {
      // Pop the last item from currentPath and set currentFiles accordingly
      const newPath = currentPath.slice(0, -1);
      setCurrentPath(newPath);

      if (newPath.length === 0) {
        setCurrentFiles(filteredFiles);
      } else {
        const file = newPath[newPath.length - 1];
        setCurrentFiles(file.subfolder);
      }

      // Remove the last breadcrumb (folder name)
      setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, -1));
    } else {
      // If no more items in the path, reset to initial state
      setCurrentFiles(filteredFiles);
      setBreadcrumbs([]); // Reset breadcrumbs to empty
    }
  };
  const handleBreadcrumbClick = (index) => {
    if (index === breadcrumbs.length - 1) return; // Do nothing if clicking on the current folder

    if (index === -1) {
      // User clicked on 'Qovluqlar', reset to root
      setCurrentPath([]);
      setCurrentFiles(filteredFiles);
      setBreadcrumbs([]);
      setShowTable(false);
      setCurrentFile(null);
    } else {
      // Navigate to the selected breadcrumb level
      const newPath = currentPath.slice(0, index + 1);
      setCurrentPath(newPath);

      const file = newPath[newPath.length - 1];
      setCurrentFiles(file.subfolder);

      setBreadcrumbs(breadcrumbs.slice(0, index + 1));
      setShowTable(false);
      setCurrentFile(null);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      {/* Modal content */}
      <div
        className="bg-white rounded-lg p-10 w-[960px] relative max-h-[790px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-20 ">
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

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="flex items-center mb-4">
              <span
                className="font-gilroy text-gray-400 cursor-pointer hover:underline"
                onClick={() => handleBreadcrumbClick(-1)}
              >
                Qovluqlar
              </span>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span className="mx-2 text-gray-400">/</span>
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

          {/* Search and View Mode Controls */}
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

              {/* View Mode Buttons */}
              <div className="flex gap-1 border rounded-lg ">
                <div
                  className={`p-1 m-1 rounded-md cursor-pointer ${
                    selectedIcon === "grid" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleIconClick("grid")}
                >
                  {/* Grid Icon */}
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
                  {/* List Icon */}
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
        </div>
        {/* Close button */}

        {/* Main Content */}
        {!showTable ? (
          <div className="py-6">
            <div
              className={
                selectedIcon === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  : "flex flex-col gap-3"
              }
            >
              {currentFiles.map((file, index) => (
                <QuestionCard
                  key={file.slug}
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
                  showActions={false} // Hide edit/delete actions in modal
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="">
            {/* Render your table component here */}
            <TableComponent file={currentFile} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddQuestionModal;
