import React, { useEffect, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";
import useEmblaCarousel from "embla-carousel-react";
import { MdNavigateNext } from "react-icons/md";
import { RiLoopRightLine } from "react-icons/ri";

function FilterCategories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const categories = [
    "ux/uı dizayn",
    "front-end proqramlaşdırma",
    "data analitika",
    "back-end proqramlaşdırma",
    "ux/uı dizayn",
    "front-end proqramlaşdırma",
    // ... up to 30 categories
  ];
  const timeOptions = [
    "40 dəqiqə",
    "1 saat",
    "1 saat 20 dəqiqə",
    "60 dəqiqə",
    "1 saat 40 dəqiqə",
    "2 saat",
    "2 saat 20 dəqiqə",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const modalRef = useRef(null);
  // New state to store applied filters
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
    if (
      appliedFilters.selectedCategories &&
      appliedFilters.selectedCategories.length > 0
    )
      count++;
    return count;
  }

  // Determine whether to show categories mapping
  const isAnyModalInputFilled = () => {
    return (
      minPrice !== "" ||
      maxPrice !== "" ||
      selectedTime !== "" ||
      (selectedCategories && selectedCategories.length > 0)
    );
  };

  const showCategories = getActiveFilterCount() === 0 && !isModalOpen;

  useEffect(() => {
    if (!emblaApi || !showCategories) return;

    const checkScroll = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    // Initial check
    checkScroll();

    // Listen to Embla events
    emblaApi.on("select", checkScroll);
    emblaApi.on("scroll", checkScroll);
    emblaApi.on("resize", checkScroll);

    // Cleanup
    return () => {
      emblaApi.off("select", checkScroll);
      emblaApi.off("scroll", checkScroll);
      emblaApi.off("resize", checkScroll);
    };
  }, [emblaApi, showCategories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside the modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false); // Close the modal
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when the modal is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  // When modal opens, populate inputs with applied filters
  useEffect(() => {
    if (isModalOpen) {
      setMinPrice(appliedFilters.minPrice);
      setMaxPrice(appliedFilters.maxPrice);
      setSelectedTime(appliedFilters.selectedTime);
      setSelectedCategories(appliedFilters.selectedCategories || []);
    }
  }, [isModalOpen]);

  // Function to remove a filter
  function removeFilter(filterType, value) {
    setAppliedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (filterType === "category") {
        newFilters.selectedCategories = newFilters.selectedCategories.filter(
          (category) => category !== value
        );
      } else {
        newFilters[filterType] = "";
      }
      return newFilters;
    });
  }

  return (
    <>
      <div className="relative my-8">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-none">
            <button
              className="relative flex items-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-full px-4 py-3 text-lg"
              onClick={() => setIsModalOpen(true)}
            >
              <IoFilter />
              Ətraflı axtarış
              {getActiveFilterCount() > 0 && (
                <span className="absolute top-1 right-2 transform translate-x-1/2 -translate-y-1/2 bg-brandBlue200 text-white text-sm rounded-full px-2 py-1">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>

          {getActiveFilterCount() > 0 ? (
            // Render selected filters as buttons
            <div className="flex flex-wrap gap-2">
              {/* Selected Categories */}
              {appliedFilters.selectedCategories &&
                appliedFilters.selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-3 bg-buttonPrimaryDefault text-white rounded-full px-4 py-3 font-gilroy font-normal text-lg leading-6"
                  >
                    {category}
                    <button
                      onClick={() => removeFilter("category", category)}
                      className="ml-2 text-xl text-white hover:text-gray-300 focus:outline-none flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              {/* Selected Time */}
              {appliedFilters.selectedTime && (
                <div className="flex items-center gap-3 bg-buttonPrimaryDefault text-white rounded-full px-4 py-3 font-gilroy font-normal text-lg leading-6">
                  {appliedFilters.selectedTime}
                  <button
                    onClick={() => removeFilter("selectedTime")}
                    className="ml-2 text-xl text-white hover:text-gray-300 focus:outline-none flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              )}
              {/* Price Filter */}
              {(appliedFilters.minPrice || appliedFilters.maxPrice) && (
                <div className="flex items-center gap-3 font-gilroy bg-buttonPrimaryDefault text-white rounded-full px-4 py-3 font-gilroy font-normal text-lg leading-6">
                  <span className="font-gilroy">
                    qiymət (
                    {appliedFilters.minPrice && `${appliedFilters.minPrice} ₼`}
                    {appliedFilters.minPrice && appliedFilters.maxPrice
                      ? " - "
                      : ""}
                    {appliedFilters.maxPrice && `${appliedFilters.maxPrice} ₼`})
                  </span>
                  <button
                    onClick={() => {
                      removeFilter("minPrice");
                      removeFilter("maxPrice");
                    }}
                    className="ml-2 text-xl font-gilroy text-white hover:text-gray-300 focus:outline-none flex items-center justify-center"
                    aria-label="Remove Price Filter"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          ) : (
            showCategories && (
              <div className="flex-1 font-gilroy overflow-hidden relative" ref={emblaRef}>
                <div className="flex font-gilroy gap-4">
                  {categories.map((category, index) => (
                    <div key={index} className="flex-none">
                      <button className="flex font-gilroy items-center gap-3 bg-grayLineFooter text-grayButtonText rounded-full px-4 py-3 font-gilroy font-normal text-lg leading-6">
                        {category}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Left Scroll Icon */}
        {showCategories && canScrollPrev && (
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textSecondaryDefault z-10 bg-white rounded-full p-2 shadow-md"
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            aria-label="Scroll Left"
          >
            <GrFormPrevious className="fill-black text-black text-lg" />
          </button>
        )}

        {/* Right Scroll Icon */}
        {showCategories && canScrollNext && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 bg-white rounded-full p-2 shadow-md"
            onClick={() => emblaApi && emblaApi.scrollNext()}
            aria-label="Scroll Right"
          >
            <MdNavigateNext className="fill-black text-black text-lg" />
          </button>
        )}
      </div>

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
                {/* Min Price Input */}
                <div className="relative w-full">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Min Price"
                    className={`w-full border font-gilroy border-gray-300 rounded-md py-3 px-4 appearance-none hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus focus:outline-none ${
                      minPrice ? "text-black" : "text-[#B2B2B2]"
                    }`}
                    value={minPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numeric values
                      if (/^\d*$/.test(value)) {
                        setMinPrice(value);
                      }
                    }}
                  />
                  <span className="absolute font-gilroy right-4 top-1/2 transform -translate-y-1/2 text-[#B2B2B2]">
                    AZN
                  </span>
                </div>

                {/* Max Price Input */}
                <div className="relative w-full">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Max Price"
                    className={`w-full border font-gilroy border-gray-300 rounded-md py-3 px-4 appearance-none hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus focus:outline-none ${
                      maxPrice ? "text-black" : "text-[#B2B2B2]"
                    }`}
                    value={maxPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numeric values
                      if (/^\d*$/.test(value)) {
                        setMaxPrice(value);
                      }
                    }}
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
                {/* Custom Dropdown Input */}
                <div
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-[#B2B2B2] cursor-pointer flex justify-between items-center time-dropdown-input hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus"
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                >
                  <span
                    className={selectedTime ? "text-black font-gilroy" : "text-[#B2B2B2] font-gilroy"}
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
                  <div className="absolute font-gilroy z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-scroll time-dropdown-menu">
                    {timeOptions.map((timeOption, index) => (
                      <div
                        key={index}
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-black"
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

            {/* Categories Dropdown */}
            <div className="mb-4">
              <p className="mb-3 font-gilroy text-textSecondaryDefault font-medium text-xl leading-7">
                Kateqoriya
              </p>
              <div className="relative">
                {/* Custom Dropdown Input */}
                <div
                  className={`w-full border font-gilroy border-gray-300 rounded-md py-3 px-4 cursor-pointer flex flex-wrap items-center dropdown-input hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus ${isCategoryDropdownOpen}`}
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
                          <span className="font-gilroy text-base">
                            {category}
                          </span>
                          <button
                            className="ml-1 font-gilroy text-xl text-black hover:text-gray-700 focus:outline-none flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent dropdown toggle
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
                    </>
                  ) : (
                    <>
                      <span className="text-[#B2B2B2]">Kateqoriya seçin</span>
                      <div className="flex-1" />
                      <svg
                        className={`w-4 h-4 transition-transform text-[#B2B2B2]  ${
                          isCategoryDropdownOpen ? "transform rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </div>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute font-gilroy z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-[7.5rem] overflow-y-scroll category-dropdown">
                    {categories.map((category, index) => {
                      const isSelected = selectedCategories.includes(category);
                      return (
                        <div
                          key={index}
                          className={`py-2 px-4 font-gilroy hover:bg-gray-100 cursor-pointer flex justify-between items-center ${
                            isSelected ? "bg-gray-100" : ""
                          }`}
                          onClick={() => {
                            if (isSelected) {
                              // Remove category
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (item) => item !== category
                                )
                              );
                            } else {
                              // Add category
                              setSelectedCategories([
                                ...selectedCategories,
                                category,
                              ]);
                            }
                          }}
                        >
                          <span className="text-black font-gilroy">{category}</span>
                          {isSelected && (
                            <svg
                              className="w-4 h-4 text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="w-full flex font-gilroy flex-row justify-between mt-6">
              <button
                className="w-full ml-2 font-gilroy  text-lg font-normal text-textSecondaryDefault flex flex-row items-center justify-center gap-2 "
                onClick={() => {
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
                }}
              >
                <RiLoopRightLine  /> Filteri sıfırla
              </button>

              <button
                className="w-full ml-2 font-gilroy bg-buttonPrimaryDefault text-white py-3 rounded-md font-gilroy text-lg font-normal"
                onClick={() => {
                  // Save filters and close modal
                  setAppliedFilters({
                    minPrice,
                    maxPrice,
                    selectedTime,
                    selectedCategories,
                  });
                  setIsModalOpen(false);
                }}
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
