import React, { useState, useRef, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";

const SubFolderCard = ({
  subFolders,
  viewMode,
  selectedFiles,
  setSelectedFiles,
  openEditFolderModal,
  openDeleteFolderModal,
}) => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBoxClick = (subfolder) => {
    const newPath = `${router.asPath}/${subfolder.slug}`;
    router.push(newPath);
  };

  const handleCheckboxChange = (subfolderUrl, isChecked) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (isChecked) {
        return [...prevSelectedFiles, subfolderUrl];
      } else {
        return prevSelectedFiles.filter((url) => url !== subfolderUrl);
      }
    });
  };

  return (
    <div className="py-6">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {subFolders.map((subfolder, index) => (
            <div
              key={subfolder.slug}
              className="relative flex flex-col p-6 rounded-[10px] border border-gray-100 bg-white shadow-createBox cursor-pointer"
              onClick={() => handleBoxClick(subfolder)}
            >
              <div className="flex w-full justify-between items-center mb-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-3 cursor-pointer appearance-none border-2 border-inputBorder rounded checked:bg-inputBorder focus:outline-none"
                  checked={selectedFiles.includes(subfolder.url)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleCheckboxChange(subfolder.url, e.target.checked)
                  }
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
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditFolderModal(subfolder);
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
                          openDeleteFolderModal(subfolder);
                          setDropdownVisible(null);
                        }}
                      >
                        <BsTrash className="text-red-500" />
                        Qovluğu sil
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <p className="flex flex-col w-full">
                <div className="flex items-center space-x-2">
                  <div className="text-yellow-500">
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
                  <h3 className="text-xl font-gilroy leading-7.5 text-brandBlue700 font-medium">
                    {subfolder.name}
                  </h3>
                </div>
                <div className="relative group">
                  <div className="text-3.5 font-gilroy mt-1.5 text-arrowButtonGray font-medium  truncate cursor-pointer max-w-[15ch] mx-auto">
                    {subfolder.sub_folder && subfolder.sub_folder.length > 0
                      ? subfolder.sub_folder.join(" ~ ")
                      : "Hazırda fayl yoxdur"}
                  </div>
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[999]">
                    {subfolder.sub_folder && subfolder.sub_folder.length > 0
                      ? subfolder.sub_folder.join(" ~ ")
                      : "Hazırda fayl yoxdur"}
                  </div>
                </div>
                <div className="md:w-[162px] h-[1px] mt-3 mb-3 bg-buttonGhostPressed"></div>
                <div className="text-sm leading-normal font-gilroy font-medium text-arrowButtonGray">
                  {subfolder?.created_at}
                </div>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {subFolders.map((subfolder, index) => (
            <div
              key={subfolder.slug}
              className="relative flex items-center p-5 rounded-[10px] border border-gray-100 bg-white shadow-createBox cursor-pointer"
              onClick={() => handleBoxClick(subfolder)}
            >
              <input
                type="checkbox"
                className="w-4 h-4 mr-3 cursor-pointer appearance-none border-2 border-inputBorder rounded checked:bg-inputBorder focus:outline-none"
                checked={selectedFiles.includes(subfolder.url)}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleCheckboxChange(subfolder.url, e.target.checked)
                }
              />

              <div className="text-yellow-500 mr-4">
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

              <h3 className="text-lg w-[400px] font-gilroy leading-7.5 text-brandBlue700 font-medium">
                {subfolder.name}
              </h3>

              <div className="relative group">
                <div className="text-3.5 w-[300px] font-gilroy mt-1.5 text-arrowButtonGray font-medium justify-start truncate cursor-pointer max-w-[15ch] mx-auto">
                  {subfolder.sub_folder && subfolder.sub_folder.length > 0
                    ? subfolder.sub_folder.join(" ~ ")
                    : "Hazırda fayl yoxdur"}
                </div>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[999]">
                  {subfolder.sub_folder && subfolder.sub_folder.length > 0
                    ? subfolder.sub_folder.join(" ~ ")
                    : "Hazırda fayl yoxdur"}
                </div>
              </div>

              <div className="ml-auto text-sm leading-normal font-gilroy font-medium text-arrowButtonGray">
                {subfolder?.created_at}
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <IoMdMore
                  className="text-gray-400 ml-2 cursor-pointer"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditFolderModal(subfolder);
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
                          openDeleteFolderModal(subfolder);
                          setDropdownVisible(null);
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SubFolderCard;
