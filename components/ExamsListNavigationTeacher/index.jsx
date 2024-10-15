import React, { useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { BiSortAlt2 } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { VscListSelection } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";
import { FaSort } from "react-icons/fa";

function ExamsListNavigationTeacher({
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
  selectedExams,
  openAddExamModal,
  openDeleteModal,
}) {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setIsSortMenuOpen(false);
  };

  return (
    <div className="flex justify-between relative font-gilroy">
      <h1 className="text-2xl font-medium leading-8">İmtahanlar Siyahısı</h1>

      {selectedExams.length > 0 ? (
        <div className="flex flex-row gap-4">
          <button
            onClick={openDeleteModal}
            className="flex items-center justify-center gap-4 py-3 px-4 h-11 w-full text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed"
          >
            <BsTrash3 className="fill-white text-white" />
            Sil
          </button>
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          {/* Sorting Dropdown */}
          <div className="flex flex-row items-center justify-center gap-2 relative">
            <div
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="flex items-center cursor-pointer gap-2"
            >
              <div className="flex items-center justify-center w-6 h-6">
                {" "}
                {/* Added fixed dimensions */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.225 6.27502C11.3422 6.39206 11.501 6.4578 11.6666 6.4578C11.8323 6.4578 11.9911 6.39206 12.1083 6.27502L12.7083 5.67502V14.1667C12.7083 14.3324 12.7741 14.4914 12.8914 14.6086C13.0086 14.7258 13.1675 14.7917 13.3333 14.7917C13.4991 14.7917 13.658 14.7258 13.7752 14.6086C13.8925 14.4914 13.9583 14.3324 13.9583 14.1667V5.67502L14.5583 6.27502C14.6155 6.33643 14.6845 6.38568 14.7612 6.41984C14.8378 6.454 14.9206 6.47237 15.0045 6.47385C15.0884 6.47533 15.1718 6.45989 15.2496 6.42846C15.3275 6.39702 15.3981 6.35023 15.4575 6.29088C15.5168 6.23154 15.5636 6.16084 15.5951 6.08302C15.6265 6.00519 15.6419 5.92184 15.6405 5.83792C15.639 5.754 15.6206 5.67124 15.5864 5.59457C15.5523 5.51791 15.503 5.4489 15.4416 5.39169L13.775 3.72502C13.6578 3.60798 13.4989 3.54224 13.3333 3.54224C13.1677 3.54224 13.0088 3.60798 12.8916 3.72502L11.225 5.39169C11.1079 5.50887 11.0422 5.66773 11.0422 5.83335C11.0422 5.99898 11.1079 6.15783 11.225 6.27502ZM7.29163 14.325L7.89163 13.725C7.94885 13.6636 8.01785 13.6144 8.09452 13.5802C8.17118 13.546 8.25394 13.5277 8.33786 13.5262C8.42178 13.5247 8.50514 13.5401 8.58296 13.5716C8.66079 13.603 8.73148 13.6498 8.79083 13.7092C8.85018 13.7685 8.89697 13.8392 8.9284 13.917C8.95984 13.9948 8.97527 14.0782 8.97379 14.1621C8.97231 14.246 8.95394 14.3288 8.91978 14.4055C8.88562 14.4821 8.83637 14.5511 8.77496 14.6084L7.1083 16.275C6.99111 16.3921 6.83226 16.4578 6.66663 16.4578C6.50101 16.4578 6.34215 16.3921 6.22496 16.275L4.5583 14.6084C4.49689 14.5511 4.44764 14.4821 4.41348 14.4055C4.37932 14.3288 4.36095 14.246 4.35947 14.1621C4.35799 14.0782 4.37343 13.9948 4.40486 13.917C4.4363 13.8392 4.48308 13.7685 4.54243 13.7092C4.60178 13.6498 4.67248 13.603 4.7503 13.5716C4.82812 13.5401 4.91148 13.5247 4.9954 13.5262C5.07932 13.5277 5.16208 13.546 5.23875 13.5802C5.31541 13.6144 5.38441 13.6636 5.44163 13.725L6.04163 14.325V5.83335C6.04163 5.66759 6.10748 5.50862 6.22469 5.39141C6.3419 5.2742 6.50087 5.20835 6.66663 5.20835C6.83239 5.20835 6.99136 5.2742 7.10857 5.39141C7.22578 5.50862 7.29163 5.66759 7.29163 5.83335V14.325Z"
                    fill="#000A33"
                  />
                </svg>
              </div>
              <p className="text-base text-textSecondaryDefault leading-6">
                Sırala
              </p>
            </div>
            {isSortMenuOpen && (
              <div className="py-4 px-5 absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-md z-10">
                <ul className="divide-y divide-gray-200">
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleSortOptionClick("Son Yaradilan")}
                  >
                    Son Yaradılan
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleSortOptionClick("Ilk Yaradilan")}
                  >
                    İlk Yaradılan
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleSortOptionClick("A-Z")}
                  >
                    A-Z
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleSortOptionClick("Z-A")}
                  >
                    Z-A
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="p-1 flex gap-3 border border-inputBorder rounded-lg">
            <div
              className={`p-1 rounded-lg cursor-pointer ${
                viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <BsGrid className="h-7 w-14" />
            </div>
            <div
              className={`p-1 rounded-lg cursor-pointer ${
                viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
              onClick={() => setViewMode("list")}
            >
              <VscListSelection className="h-6 w-16" />
            </div>
          </div>

          {/* Add Exam Button */}
          <button
            onClick={openAddExamModal}
            className="flex items-center justify-center gap-4 py-2  h-11 w-full text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
          >
            <FaPlus className="fill-white text-white" />
            Əlavə et
          </button>
        </div>
      )}
    </div>
  );
}

export default ExamsListNavigationTeacher;
