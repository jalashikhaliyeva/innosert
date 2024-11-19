import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { BsTrash } from "react-icons/bs";

const QuestionFiles = ({
  files,
  viewMode,
  sortOption,
  selectedFiles,
  setSelectedFiles,
  openEditFolderModal,
  openDeleteFolderModal,
}) => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const dropdownRef = useRef(null);

  console.log(files, "files company question files");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (fileId, isChecked) => {
    console.log(`File ID: ${fileId}, Checked: ${isChecked}`);
    setSelectedFiles((prevSelectedFiles) => {
      if (isChecked) {
        console.log("Adding to selectedFiles:", fileId);
        return [...prevSelectedFiles, fileId];
      } else {
        console.log("Removing from selectedFiles:", fileId);
        return prevSelectedFiles.filter((id) => id !== fileId);
      }
    });
  };

  const handleBoxClick = (file) => {
    router.push(`/sual-bazasi/${file.slug}`);
  };

  const sortedFiles = [...files];

  // Adjust the sorting logic for 'Son Yaradilan' and 'Ilk Yaradilan'
  if (sortOption === "Ilk Yaradilan") {
    sortedFiles.sort(
      (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
    );
  } else if (sortOption === "Son Yaradilan") {
    sortedFiles.sort(
      (a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0)
    );
  } else if (sortOption === "A-Z") {
    sortedFiles.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "Z-A") {
    sortedFiles.sort((a, b) => b.name.localeCompare(a.name));
  }

  const handleSelect = (folder) => {
    if (selectedFiles.includes(folder)) {
      setSelectedFiles(selectedFiles.filter((f) => f.id !== folder.id));
    } else {
      setSelectedFiles([...selectedFiles, folder]);
    }
  };
  return (
    <div className="py-6">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sortedFiles.map((file, index) => (
            <div
              key={file.slug} // Ensure unique key
              className="relative flex flex-col p-6 rounded-[10px] border border-gray-100 bg-white shadow-createBox"
            >
              <div className="flex w-full justify-between items-center mb-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-3 cursor-pointer appearance-none border-2 border-inputBorder rounded checked:bg-inputBorder checked:border-inputBorder checked:before:content-['✔'] checked:before:text-white checked:before:block checked:before:text-center checked:before:leading-none checked:before:text-xs focus:outline-none"
                  checked={selectedFiles.includes(file)}
                  onChange={() => handleSelect(file)}
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
                      <li
                        className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          openEditFolderModal(file);
                          setDropdownVisible(null); // Close the dropdown
                        }}
                      >
                        <CiEdit />
                        Redaktə et
                      </li>
                      <li
                        className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          openDeleteFolderModal(file);
                          setDropdownVisible(null); // Close the dropdown
                        }}
                      >
                        <BsTrash className="text-red-500" />
                        Qovluğu sil
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div
                className="cursor-pointer"
                onClick={() => handleBoxClick(file)}
              >
                <p className="flex flex-col w-full">
                  <div className="flex items-center space-x-2">
                    <div className="text-yellow-500">
                      {/* SVG Icon */}
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
                    </div>
                    <div className="relative group inline-block">
                      <h3 className="text-xl font-gilroy leading-7.5 text-brandBlue700 font-medium cursor-pointer">
                        {file?.name?.length > 6
                          ? `${file?.name.slice(0, 8)}...`
                          : file?.name}
                      </h3>
                      {file?.name?.length > 6 && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[999]">
                          {file?.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="text-3.5 font-gilroy mt-1.5 text-arrowButtonGray font-medium truncate cursor-pointer max-w-[15ch] mx-auto">
                      {file.sub_folder && file.sub_folder.length > 0
                        ? file.sub_folder.join(" ~ ")
                        : "Hazırda fayl yoxdur"}
                    </div>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[999]">
                      {file.sub_folder && file.sub_folder.length > 0
                        ? file.sub_folder.join(" ~ ")
                        : "Hazırda fayl yoxdur"}
                    </div>
                  </div>

                  <div className="md:w-[162px] h-[1px] mt-3 mb-3 bg-buttonGhostPressed"></div>

                  <div className="text-sm leading-normal font-gilroy font-medium text-arrowButtonGray">
                    {file?.created_at}
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sortedFiles.map((file, index) => (
            <div
              onClick={() => handleBoxClick(file)}
              key={file.slug} // Ensure unique key
              className="cursor-pointer relative flex items-center p-5 rounded-[10px] border border-gray-100 bg-white shadow-createBox"
            >
              <a className="flex items-center w-full">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-3 cursor-pointer appearance-none border-2 border-inputBorder rounded checked:bg-inputBorder checked:border-inputBorder checked:before:content-['✔'] checked:before:text-white checked:before:block checked:before:text-center checked:before:leading-none checked:before:text-xs focus:outline-none"
                  checked={selectedFiles.includes(file)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => handleSelect(file)}
                />
                {/* Folder Icon */}
                <div className="text-yellow-500 mr-4">
                  {/* SVG Icon */}
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
                </div>
                {/* File Info */}
                <div className="flex items-center w-full justify-between">
                  <div className="relative group inline-block w-[400px]">
                    <h3 className="text-xl font-gilroy leading-7.5 text-brandBlue700 font-medium cursor-pointer">
                      {file.name.length > 35
                        ? `${file.name.slice(0, 35)}...`
                        : file.name}
                    </h3>
                    {file.name.length > 35 && (
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[999]">
                        {file.name}
                      </div>
                    )}
                  </div>

                  <div className="relative group">
                    <div className="text-3.5 font-gilroy mt-1.5 text-arrowButtonGray font-medium justify-start truncate cursor-pointer max-w-[30ch] mx-auto">
                      {file.sub_folder && file.sub_folder.length > 0
                        ? file.sub_folder.join(" ~ ")
                        : "Hazırda fayl yoxdur"}
                    </div>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[999]">
                      {file.sub_folder && file.sub_folder.length > 0
                        ? file.sub_folder.join(" ~ ")
                        : "Hazırda fayl yoxdur"}
                    </div>
                  </div>

                  <div className=" text-sm leading-normal font-gilroy font-medium text-arrowButtonGray">
                    {file?.created_at}
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
                          <li
                            className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              openEditFolderModal(file);
                              setDropdownVisible(null); // Close the dropdown
                            }}
                          >
                            <CiEdit />
                            Redaktə et
                          </li>
                          <li
                            className="flex items-center gap-2 px-4 py-2 text-md text-textSecondaryDefault font-gilroy hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              openDeleteFolderModal(file);
                              setDropdownVisible(null); // Close the dropdown
                            }}
                          >
                            <BsTrash className="text-red-500" />
                            Qovluğu sil
                          </li>
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

export default QuestionFiles;
