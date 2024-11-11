import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { UserContext } from "@/shared/context/UserContext";

const ExamsListTeacher = ({
  exams,
  showTeacherName,
  viewMode,
  sortOption,
  setSelectedExams,
  selectedExams = [],
  openDeleteExamModal,
  openEditFolderModal,
}) => {
  console.log(exams, "exams examst list teacher");
  const { examDetailsSingle, setExamDetailsSingle, examToEdit, setExamToEdit } =
    useContext(UserContext);
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const dropdownRef = useRef(null);

  const [tooltipText, setTooltipText] = useState(null);

  const handleMouseEnter = (text) => {
    setTooltipText(text);
  };

  const handleMouseLeave = () => {
    setTooltipText(null);
  };

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const combinedItems = useMemo(() => {
    const folders = (exams.folders || []).map((folder) => ({
      ...folder,
      type: "folder",
      date: folder.created_at || folder.updated_at,
    }));

    const examsList = (exams.exams || []).map((exam) => ({
      ...exam,
      type: "exam",
      date: exam.date || exam.created_at,
    }));

    return [...folders, ...examsList];
  }, [exams]);
  const sortedItems = useMemo(() => {
    const sorted = [...combinedItems];
    if (sortOption === "Son Yaradilan") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "Ilk Yaradilan") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "A-Z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Z-A") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sorted;
  }, [combinedItems, sortOption]);
  const handleCheckboxChange = (item, isChecked) => {
    setSelectedExams((prevSelectedExams) => {
      if (isChecked) {
        return [...prevSelectedExams, item];
      } else {
        return prevSelectedExams.filter(
          (selectedItem) => selectedItem.slug !== item.slug
        );
      }
    });
  };

  const handleItemClick = (item) => {
    if (item.type === "folder") {
      // Navigate to the folder's exam list and pass the folder slug
      router.push(`/umumi-imtahanlar/${item.slug}`);
    } else if (item.type === "exam") {
      // Navigate to the exam details

      setExamDetailsSingle(item);
      console.log(item, "item exam to edit");
      
      router.push(`/imtahan-detallari`); // Assuming you want to pass the exam slug
    }
  };

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="py-6">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {sortedItems.map((item, index) => (
            <div
              key={`${item.type}-${item.slug}`} // Ensure unique key by combining type and slug
              className="relative flex flex-col p-6 rounded-[10px] border border-gray-100 bg-white shadow-createBox"
            >
              <div className="flex w-full justify-between items-center mb-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-3 cursor-pointer appearance-none border-2 border-inputBorder rounded checked:bg-inputBorder checked:border-inputBorder checked:before:content-['✔'] checked:before:text-white checked:before:block checked:before:text-center checked:before:leading-none checked:before:text-xs focus:outline-none"
                  checked={selectedExams.some(
                    (selectedItem) => selectedItem.slug === item.slug
                  )}
                  onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                />

                <IoMdMore
                  className="text-inputBorder cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownVisible(
                      dropdownVisible === index ? null : index
                    );
                  }}
                />
                {dropdownVisible === index && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
                  >
                    <ul>
                      {item.type === "exam" && (
                        <>
                          <li
                            className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setExamToEdit(item);
                              router.push(`/imtahan-redakte`);
                              setDropdownVisible(null);
                            }}
                          >
                            <CiEdit />
                            Redaktə et
                          </li>
                          <li
                            className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              openDeleteExamModal(item);
                              setDropdownVisible(null);
                            }}
                          >
                            <BsTrash className="text-red-500" />
                            İmtahanı sil
                          </li>
                        </>
                      )}
                      {item.type === "folder" && (
                        <>
                          {/* Add folder-specific actions here if needed */}
                          <li
                            className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              openEditFolderModal(item);
                              setDropdownVisible(null);
                            }}
                          >
                            <CiEdit />
                            Qovluğu redaktə et
                          </li>
                          <li
                            className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              // Example: Delete folder
                              openDeleteExamModal(item);
                              setDropdownVisible(null);
                            }}
                          >
                            <BsTrash className="text-red-500" />
                            Qovluğu sil
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div
                className="cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <p className="flex flex-col w-full">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-yellow-500">
                      {item.type === "folder" ? (
                        // Folder Icon
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28px"
                          height="28px"
                          viewBox="0 0 28 28"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M23.333 7.00002H12.833L10.4997 4.66669H4.66634C3.38301 4.66669 2.33301 5.71669 2.33301 7.00002V11.6667H25.6663V9.33335C25.6663 8.05002 24.6163 7.00002 23.333 7.00002Z"
                            fill="#FFA000"
                          />
                          <path
                            d="M23.333 7H4.66634C3.38301 7 2.33301 8.05 2.33301 9.33333V21C2.33301 22.2833 3.38301 23.3333 4.66634 23.3333H23.333C24.6163 23.3333 25.6663 22.2833 25.6663 21V9.33333C25.6663 8.05 24.6163 7 23.333 7Z"
                            fill="#FFCA28"
                          />
                        </svg>
                      ) : (
                        // Exam Icon
                        <svg
                          width="29"
                          height="28"
                          viewBox="0 0 29 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.5742 9.46422V6.125C25.5742 5.66087 25.3898 5.21575 25.0617 4.88756C24.7335 4.55937 24.2883 4.375 23.8242 4.375H4.57422C4.11009 4.375 3.66497 4.55937 3.33678 4.88756C3.00859 5.21575 2.82422 5.66087 2.82422 6.125V20.125C2.82422 20.5891 3.00859 21.0342 3.33678 21.3624C3.66497 21.6906 4.11009 21.875 4.57422 21.875H17.6992V24.5C17.6978 24.6543 17.7372 24.8061 17.8135 24.9403C17.8897 25.0744 18 25.186 18.1333 25.2637C18.2665 25.3414 18.418 25.3825 18.5722 25.3829C18.7265 25.3832 18.8781 25.3428 19.0117 25.2656L21.6367 23.7628L24.2617 25.2656C24.3953 25.3428 24.5469 25.3832 24.7012 25.3829C24.8555 25.3825 25.0069 25.3414 25.1401 25.2637C25.2734 25.186 25.3837 25.0744 25.46 24.9403C25.5362 24.8061 25.5756 24.6543 25.5742 24.5V17.6608C26.1273 17.1311 26.5675 16.4949 26.8682 15.7906C27.1689 15.0863 27.324 14.3283 27.324 13.5625C27.324 12.7967 27.1689 12.0387 26.8682 11.3344C26.5675 10.6301 26.1273 9.9939 25.5742 9.46422ZM14.1992 15.75H8.07422C7.84215 15.75 7.61959 15.6578 7.4555 15.4937C7.29141 15.3296 7.19922 15.1071 7.19922 14.875C7.19922 14.6429 7.29141 14.4204 7.4555 14.2563C7.61959 14.0922 7.84215 14 8.07422 14H14.1992C14.4313 14 14.6538 14.0922 14.8179 14.2563C14.982 14.4204 15.0742 14.6429 15.0742 14.875C15.0742 15.1071 14.982 15.3296 14.8179 15.4937C14.6538 15.6578 14.4313 15.75 14.1992 15.75ZM14.1992 12.25H8.07422C7.84215 12.25 7.61959 12.1578 7.4555 11.9937C7.29141 11.8296 7.19922 11.6071 7.19922 11.375C7.19922 11.1429 7.29141 10.9204 7.4555 10.7563C7.61959 10.5922 7.84215 10.5 8.07422 10.5H14.1992C14.4313 10.5 14.6538 10.5922 14.8179 10.7563C14.982 10.9204 15.0742 11.1429 15.0742 11.375C15.0742 11.6071 14.982 11.8296 14.8179 11.9937C14.6538 12.1578 14.4313 12.25 14.1992 12.25ZM23.8242 22.9917L22.0742 21.9898C21.942 21.9143 21.7923 21.8745 21.64 21.8745C21.4877 21.8745 21.338 21.9143 21.2058 21.9898L19.4558 22.9917V18.8125C20.1487 19.102 20.8923 19.2511 21.6433 19.2511C22.3943 19.2511 23.1378 19.102 23.8308 18.8125L23.8242 22.9917ZM21.6367 17.5C20.858 17.5 20.0967 17.2691 19.4492 16.8364C18.8016 16.4038 18.297 15.7888 17.9989 15.0693C17.7009 14.3498 17.6229 13.5581 17.7749 12.7943C17.9268 12.0305 18.3018 11.3289 18.8525 10.7783C19.4032 10.2276 20.1047 9.85259 20.8685 9.70066C21.6324 9.54873 22.424 9.6267 23.1435 9.92472C23.863 10.2227 24.478 10.7274 24.9106 11.3749C25.3433 12.0225 25.5742 12.7837 25.5742 13.5625C25.5742 14.0796 25.4724 14.5916 25.2745 15.0693C25.0766 15.547 24.7866 15.9811 24.421 16.3467C24.0553 16.7124 23.6213 17.0024 23.1435 17.2003C22.6658 17.3982 22.1538 17.5 21.6367 17.5Z"
                            fill="#4F7291"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="relative group">
                      <h3 className="text-base font-gilroy leading-7.5 text-brandBlue700 font-medium truncate md:max-w-xs max-w-[60px]">
                        {item?.name?.length > 14
                          ? `${item?.name.slice(0, 14)}...`
                          : item?.name}
                      </h3>

                      {item?.name?.length > 14 && (
                        <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-white border text-black text-xs rounded px-2 py-1 whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.type === "folder" ? (
                    <div>
                      {item.sub_folder && item.sub_folder.length > 0 ? (
                        <div className="relative inline-block group text-arrowButtonGray cursor-pointer">
                          {/* Display up to 9 subfolders */}
                          <div className="text-3.5 font-gilroy  truncate max-w-[15ch] mx-auto">
                            {item.sub_folder
                              .slice(0, 9)
                              .map((subFolder, index) => (
                                <span key={index}>
                                  {index ===
                                  item.sub_folder.slice(0, 9).length - 1
                                    ? subFolder.length > 5
                                      ? subFolder.slice(0, 5) + "..."
                                      : subFolder
                                    : subFolder.length > 5
                                    ? subFolder.slice(0, 5)
                                    : subFolder}
                                  {index !==
                                    item.sub_folder.slice(0, 9).length - 1 &&
                                    ", "}
                                </span>
                              ))}
                            {item.sub_folder.length > 9 && <span>...</span>}
                          </div>

                          {/* Single Tooltip displaying all subfolders */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                            {item.sub_folder.join(", ")}
                          </div>
                        </div>
                      ) : (
                        <div className="relative group text-arrowButtonGray font-gilroy !text-base cursor-pointer">
                          <span className="truncate max-w-[15ch]">
                            {"Bu qovluqda imtahan yoxdur.".length > 17
                              ? "Bu qovluqda imtahan yoxdur.".substring(0, 17) +
                                "..."
                              : "Bu qovluqda imtahan yoxdur."}
                          </span>

                          {/* Tooltip for the no subfolder case */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                            Bu qovluqda imtahan yoxdur.
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-arrowButtonGray !text-base font-gilroy">
                      {item.count} sual
                      {showTeacherName && ` | ${item.created_at}`}
                    </div>
                  )}

                  <div className="md:w-[162px] h-[1px] mt-3 mb-3 bg-buttonGhostPressed"></div>

                  <div className="text-sm leading-normal font-gilroy font-medium text-arrowButtonGray"></div>
                </p>

                {item.type === "folder" && (
                  <p className="flex gap-2 items-center text-sm leading-normal font-gilroy font-medium text-arrowButtonGray">
                    {item.created_at}
                  </p>
                )}
                {showTeacherName && item.type === "exam" && (
                  <p className="flex gap-2 items-center text-sm leading-normal font-gilroy font-medium text-arrowButtonGray">
                    {item.author_image ? (
                      <img
                        src={item.author_image}
                        alt={`${item.author}'s profile`}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#EDEFFD] text-gray-600 font-medium">
                        {item.author
                          .split(" ")
                          .map((namePart) => namePart[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                    {item.author}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sortedItems.map((item, index) => (
            <div
              key={`${item.type}-${item.slug}`} // Ensure unique key by combining type and slug
              className="cursor-pointer relative flex items-center p-5 rounded-[10px] border border-gray-100 bg-white shadow-createBox"
              onClick={() => handleItemClick(item)}
            >
              <a className="flex items-center w-full">
                {item.type === "exam" && (
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-3 cursor-pointer appearance-none border-2 border-inputBorder rounded checked:bg-inputBorder checked:border-inputBorder checked:before:content-['✔'] checked:before:text-white checked:before:block checked:before:text-center checked:before:leading-none checked:before:text-xs focus:outline-none"
                    checked={selectedExams.some(
                      (selectedItem) => selectedItem.slug === item.slug
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(item, e.target.checked)
                    }
                  />
                )}
                <div className="text-yellow-500 mr-4">
                  {item.type === "folder" ? (
                    // Folder Icon
                    <svg
                      width="29"
                      height="28"
                      viewBox="0 0 29 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.7344 6.99984H13.2344L10.901 4.6665H5.06771C3.78437 4.6665 2.73438 5.7165 2.73438 6.99984V11.6665H26.0677V9.33317C26.0677 8.04984 25.0177 6.99984 23.7344 6.99984Z"
                        fill="#FFA000"
                      />
                      <path
                        d="M23.7344 7H5.06771C3.78437 7 2.73438 8.05 2.73438 9.33333V21C2.73438 22.2833 3.78437 23.3333 5.06771 23.3333H23.7344C25.0177 23.3333 26.0677 22.2833 26.0677 21V9.33333C26.0677 8.05 25.0177 7 23.7344 7Z"
                        fill="#FFCA28"
                      />
                    </svg>
                  ) : (
                    // Exam Icon
                    <svg
                      width="29"
                      height="28"
                      viewBox="0 0 29 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.5742 9.46422V6.125C25.5742 5.66087 25.3898 5.21575 25.0617 4.88756C24.7335 4.55937 24.2883 4.375 23.8242 4.375H4.57422C4.11009 4.375 3.66497 4.55937 3.33678 4.88756C3.00859 5.21575 2.82422 5.66087 2.82422 6.125V20.125C2.82422 20.5891 3.00859 21.0342 3.33678 21.3624C3.66497 21.6906 4.11009 21.875 4.57422 21.875H17.6992V24.5C17.6978 24.6543 17.7372 24.8061 17.8135 24.9403C17.8897 25.0744 18 25.186 18.1333 25.2637C18.2665 25.3414 18.418 25.3825 18.5722 25.3829C18.7265 25.3832 18.8781 25.3428 19.0117 25.2656L21.6367 23.7628L24.2617 25.2656C24.3953 25.3428 24.5469 25.3832 24.7012 25.3829C24.8555 25.3825 25.0069 25.3414 25.1401 25.2637C25.2734 25.186 25.3837 25.0744 25.46 24.9403C25.5362 24.8061 25.5756 24.6543 25.5742 24.5V17.6608C26.1273 17.1311 26.5675 16.4949 26.8682 15.7906C27.1689 15.0863 27.324 14.3283 27.324 13.5625C27.324 12.7967 27.1689 12.0387 26.8682 11.3344C26.5675 10.6301 26.1273 9.9939 25.5742 9.46422ZM14.1992 15.75H8.07422C7.84215 15.75 7.61959 15.6578 7.4555 15.4937C7.29141 15.3296 7.19922 15.1071 7.19922 14.875C7.19922 14.6429 7.29141 14.4204 7.4555 14.2563C7.61959 14.0922 7.84215 14 8.07422 14H14.1992C14.4313 14 14.6538 14.0922 14.8179 14.2563C14.982 14.4204 15.0742 14.6429 15.0742 14.875C15.0742 15.1071 14.982 15.3296 14.8179 15.4937C14.6538 15.6578 14.4313 15.75 14.1992 15.75ZM14.1992 12.25H8.07422C7.84215 12.25 7.61959 12.1578 7.4555 11.9937C7.29141 11.8296 7.19922 11.6071 7.19922 11.375C7.19922 11.1429 7.29141 10.9204 7.4555 10.7563C7.61959 10.5922 7.84215 10.5 8.07422 10.5H14.1992C14.4313 10.5 14.6538 10.5922 14.8179 10.7563C14.982 10.9204 15.0742 11.1429 15.0742 11.375C15.0742 11.6071 14.982 11.8296 14.8179 11.9937C14.6538 12.1578 14.4313 12.25 14.1992 12.25ZM23.8242 22.9917L22.0742 21.9898C21.942 21.9143 21.7923 21.8745 21.64 21.8745C21.4877 21.8745 21.338 21.9143 21.2058 21.9898L19.4558 22.9917V18.8125C20.1487 19.102 20.8923 19.2511 21.6433 19.2511C22.3943 19.2511 23.1378 19.102 23.8308 18.8125L23.8242 22.9917ZM21.6367 17.5C20.858 17.5 20.0967 17.2691 19.4492 16.8364C18.8016 16.4038 18.297 15.7888 17.9989 15.0693C17.7009 14.3498 17.6229 13.5581 17.7749 12.7943C17.9268 12.0305 18.3018 11.3289 18.8525 10.7783C19.4032 10.2276 20.1047 9.85259 20.8685 9.70066C21.6324 9.54873 22.424 9.6267 23.1435 9.92472C23.863 10.2227 24.478 10.7274 24.9106 11.3749C25.3433 12.0225 25.5742 12.7837 25.5742 13.5625C25.5742 14.0796 25.4724 14.5916 25.2745 15.0693C25.0766 15.547 24.7866 15.9811 24.421 16.3467C24.0553 16.7124 23.6213 17.0024 23.1435 17.2003C22.6658 17.3982 22.1538 17.5 21.6367 17.5Z"
                        fill="#4F7291"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex items-center w-full justify-between">
                  <h3 className="text-sm w-[300px] md:text-lg font-gilroy leading-7.5 text-brandBlue700 font-medium">
                    {item.name}
                  </h3>

                  {item.type === "folder" ? (
                    <div className="w-[300px]">
                      {item.exams && item.exams.length > 0 ? (
                        item.exams.map((subExam, index) => (
                          <span
                            key={index}
                            className="relative inline-block group text-arrowButtonGray"
                            onMouseEnter={() => handleMouseEnter(subExam.name)}
                            onMouseLeave={handleMouseLeave}
                          >
                            {item.exams.length > 1 &&
                            index === item.exams.length - 1 &&
                            subExam.name.length > 3 ? (
                              <span>
                                {subExam.name.slice(0, 3)}...
                                {tooltipText === subExam.name && (
                                  <span className="absolute left-0 bottom-full mb-2 bg-white border text-black text-xs rounded px-2 py-1 whitespace-nowrap">
                                    {subExam.name}
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span>{subExam.name}</span>
                            )}
                            {index !== item.exams.length - 1 && <span>, </span>}
                          </span>
                        ))
                      ) : (
                        <div className="text-gray90 !text-base font-gilroy">
                          Bu qovluqda imtahan yoxdur.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-[270px] text-gray90 !text-base font-gilroy">
                      {item.count} sual
                    </div>
                  )}

                  <div className="text-sm leading-normal font-gilroy font-medium text-gray90">
                    {item.created_at}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <IoMdMore
                      className="text-gray-400 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownVisible(
                          dropdownVisible === index ? null : index
                        );
                      }}
                    />
                    {dropdownVisible === index && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
                      >
                        <ul>
                          {item.type === "exam" && (
                            <>
                              <li
                                className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setExamToEdit(item);
                                  router.push(`/imtahan-redakte`);
                                  setDropdownVisible(null);
                                }}
                              >
                                <CiEdit />
                                Redaktə et
                              </li>
                              <li
                                className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDeleteExamModal(item);
                                  setDropdownVisible(null);
                                }}
                              >
                                <BsTrash className="text-red-500" />
                                İmtahanı sil
                              </li>
                            </>
                          )}
                          {item.type === "folder" && (
                            <>
                              {/* Add folder-specific actions here if needed */}
                              <li
                                className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  openEditFolderModal(item);
                                  setDropdownVisible(null);
                                }}
                              >
                                <CiEdit />
                                Qovluğu redaktə et
                              </li>
                              <li
                                className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDeleteExamModal(item);
                                  setDropdownVisible(null);
                                }}
                              >
                                <BsTrash className="text-red-500" />
                                Qovluğu sil
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamsListTeacher;
