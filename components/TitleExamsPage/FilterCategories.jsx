import React, { useEffect, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { RiLoopRightLine } from "react-icons/ri";

function FilterCategories() {
  const categories = [
    "ux/uı dizayn",
    "front-end proqramlaşdırma",
    "data analitika",
    "back-end proqramlaşdırma",
  ];

  const timeOptions = [
    "40 dəqiqə",
    "1 saat",
    "1 saat 20 dəqiqə",
    "2 saat",
    "2 saat 30 dəqiqə",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: "",
    maxPrice: "",
    selectedTime: "",
    selectedCategories: [],
  });

  // Function to get the count of active filters
  function getActiveFilterCount() {
    let count = 0;
    if (appliedFilters.minPrice || appliedFilters.maxPrice) count++;
    if (appliedFilters.selectedTime) count++;
    if (appliedFilters.selectedCategories.length > 0) count++;
    return count;
  }

  // Reset filters
  function resetFilters() {
    setMinPrice("");
    setMaxPrice("");
    setSelectedTime("");
    setSelectedCategories([]);
    setAppliedFilters({
      minPrice: "",
      maxPrice: "",
      selectedTime: "",
      selectedCategories: [],
    });
  }

  // Save applied filters
  function applyFilters() {
    setAppliedFilters({
      minPrice,
      maxPrice,
      selectedTime,
      selectedCategories,
    });
    setIsModalOpen(false); // Close modal after applying filters
  }

  // Handle close modal by clicking outside
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Filter Button */}
      <button
        className="relative flex items-center gap-3  text-gray-700   rounded-full px-4 py-3 text-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <IoFilter />
        Ətraflı axtarış
        {getActiveFilterCount() > 0 && (
          <span className="absolute top-1 right-2 transform translate-x-1/2 -translate-y-1/2 bg-brandBlue200 text-white text-sm rounded-full px-2 py-0 shadow-slate-700">
            {getActiveFilterCount()}
          </span>
        )}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="relative bg-white w-full max-w-md mx-auto p-12 rounded-2xl"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            {/* Modal Content */}
            <h2 className="font-gilroy text-center text-3xl font-medium text-buttonPrimaryDefault mb-10 leading-normal">
              Filter
            </h2>

            {/* Min and Max Price Inputs */}
            <div className="flex flex-col mb-6">
              <p className="mb-3 font-gilroy text-textSecondaryDefault font-medium text-xl leading-7">
                Qiymət
              </p>
              <div className="flex gap-3">
                <div className="relative w-full">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Min Price"
                    className={`w-full border font-gilroy border-gray-300 rounded-md py-3 px-4 ${
                      minPrice ? "text-black" : "text-[#B2B2B2]"
                    }`}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="absolute font-gilroy right-4 top-1/2 transform -translate-y-1/2 text-[#B2B2B2]">
                    AZN
                  </span>
                </div>

                <div className="relative w-full">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Max Price"
                    className={`w-full border font-gilroy border-gray-300 rounded-md py-3 px-4 ${
                      maxPrice ? "text-black" : "text-[#B2B2B2]"
                    }`}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <span className="absolute font-gilroy right-4 top-1/2 transform -translate-y-1/2 text-[#B2B2B2]">
                    AZN
                  </span>
                </div>
              </div>
            </div>

            {/* Time Dropdown */}
            <div className="mb-6">
              <p className="mb-3 font-gilroy text-textSecondaryDefault font-medium text-xl leading-7">
                İmtahan müddəti
              </p>
              <div className="relative">
                <div
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-[#B2B2B2] cursor-pointer flex justify-between items-center"
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                >
                  <span
                    className={selectedTime ? "text-black" : "text-[#B2B2B2]"}
                  >
                    {selectedTime || "Müddət seçin"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isTimeDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {isTimeDropdownOpen && (
                  <div className="absolute font-gilroy z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-scroll">
                    {timeOptions.map((timeOption, index) => (
                      <div
                        key={index}
                        className="py-2 px-4 font-gilroy hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedTime(timeOption);
                          setIsTimeDropdownOpen(false);
                        }}
                      >
                        {timeOption}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category Selection */}
            <div className="mb-4">
              <p className="mb-3 font-gilroy text-textSecondaryDefault font-medium text-xl leading-7">
                Kateqoriya
              </p>
              <div className="relative">
                <div
                  className={`w-full border font-gilroy border-gray-300 rounded-md py-3 px-4 cursor-pointer flex flex-wrap items-center ${
                    isCategoryDropdownOpen ? "active" : ""
                  }`}
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                >
                  {selectedCategories.length > 0 ? (
                    <>
                      {selectedCategories.map((category, index) => (
                        <div
                          key={index}
                          className="flex font-gilroy items-center bg-[#EBEBEB] text-black px-2 py-2 rounded-md mr-2 mb-1"
                        >
                          {category}
                          <button
                            className="ml-1 font-gilroy text-xl text-black hover:text-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (item) => item !== category
                                )
                              );
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <div className="flex-1" />
                    </>
                  ) : (
                    <span className="text-[#B2B2B2]">Kateqoriya seçin</span>
                  )}
                  <svg
                    className={`w-4 h-4 transition-transform text-[#B2B2B2] ${
                      isCategoryDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute font-gilroy z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-[7.5rem] overflow-y-scroll">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className={`py-2 px-4 font-gilroy hover:bg-gray-100 cursor-pointer flex justify-between ${
                          selectedCategories.includes(category)
                            ? "bg-gray-100"
                            : ""
                        }`}
                        onClick={() => {
                          if (selectedCategories.includes(category)) {
                            setSelectedCategories(
                              selectedCategories.filter(
                                (item) => item !== category
                              )
                            );
                          } else {
                            setSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          }
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Apply and Reset Buttons */}
            <div className="w-full flex justify-between mt-6">
              <button
                className="w-full mr-2 text-lg gap-2 text-textSecondaryDefault flex items-center justify-center"
                onClick={resetFilters}
              >
                <RiLoopRightLine /> Filteri sıfırla
              </button>

              <button
                className="w-full ml-2 bg-buttonPrimaryDefault text-white py-3 rounded-md text-lg"
                onClick={applyFilters}
              >
                Axtar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterCategories;
