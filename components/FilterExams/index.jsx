// FilterCategories.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoFilter } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";
import useEmblaCarousel from "embla-carousel-react";
import { MdNavigateNext } from "react-icons/md";
import { RiLoopRightLine } from "react-icons/ri";
import { UserContext } from "@/shared/context/UserContext";
import { useTranslation } from "next-i18next";
function FilterCategories() {
  const {
    selectedCategory,
    selectedSubcategory,
    setFilteredExams,
    filteredExams,
    setIsCategoriesFilterValid,
  } = useContext(UserContext);
  const { t } = useTranslation();
  console.log(filteredExams, "filteredExams");

  const combinedList = [
    ...(selectedCategory || []).map((cat) => ({
      name: cat.name,
      type: "category",
      id: cat.id,
    })),
    ...(selectedSubcategory || []).map((sub) => ({
      name: sub.name,
      type: "subcategory",
      id: sub.id,
    })),
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const timeOptions = [
    { label: t("0-1 hour range"), duration: [0, 60] },
    { label: t("1-2 hour range"), duration: [60, 120] },
    { label: t("2-3 hour range"), duration: [120, 180] },
    { label: t("3 or more hours"), duration: [180, 5000] },
  ];

  {
    t("0-1 hour range");
  }
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const modalRef = useRef(null);
  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: "",
    maxPrice: "",
    selectedTime: "",
    selectedCategories: [],
  });

  function handleTimeSelection(option) {
    setSelectedTime(option.label);
    setSelectedDuration(option.duration);
  }

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

    checkScroll();
    emblaApi.on("select", checkScroll);
    emblaApi.on("scroll", checkScroll);
    emblaApi.on("resize", checkScroll);

    return () => {
      emblaApi.off("select", checkScroll);
      emblaApi.off("scroll", checkScroll);
      emblaApi.off("resize", checkScroll);
    };
  }, [emblaApi, showCategories]);

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

  useEffect(() => {
    if (isModalOpen) {
      setMinPrice(appliedFilters.minPrice);
      setMaxPrice(appliedFilters.maxPrice);
      setSelectedTime(appliedFilters.selectedTime);
      setSelectedCategories(appliedFilters.selectedCategories || []);
      setSelectedDuration(
        appliedFilters.selectedTime
          ? timeOptions.find(
              (option) => option.label === appliedFilters.selectedTime
            )?.duration || null
          : null
      );
    }
  }, [isModalOpen]);

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

  const applyFilters = async () => {
    const token = localStorage.getItem("token");
    const categoryIds = selectedCategories.map(
      (category) => combinedList.find((item) => item.name === category)?.id
    );

    const data = {
      duration: selectedDuration || [],
      min_price: minPrice || null,
      max_price: maxPrice || null,
      category_id: categoryIds,
    };
    console.log("Data sent to API:", data);

    try {
      const response = await axios.post(
        "https://innocert-admin.markup.az/api/filter",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Filtered Results:", response.data);

      const dataExams = response.data.exams;
      let examsArray = [];

      if (typeof dataExams === "object" && dataExams !== null) {
        examsArray = Object.values(dataExams).flat();
      } else if (Array.isArray(dataExams)) {
        examsArray = dataExams;
      } else {
        console.error(
          "Expected exams to be an array or object, but got:",
          dataExams
        );
      }

      setFilteredExams(examsArray.length > 0 ? examsArray : null);
    } catch (error) {
      console.error("Error applying filters:", error);
      setFilteredExams(null);
    }
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedTime("");
    setSelectedDuration(null);
    setSelectedCategories([]);
    setAppliedFilters({
      minPrice: "",
      maxPrice: "",
      selectedTime: "",
      selectedCategories: [],
    });
    setFilteredExams(null);
    localStorage.removeItem("filteredExams");
  };

  const handleCategoryClick = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== categoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
    setAppliedFilters((prevFilters) => {
      const updatedCategories = selectedCategories.includes(categoryName)
        ? prevFilters.selectedCategories.filter((cat) => cat !== categoryName)
        : [...prevFilters.selectedCategories, categoryName];
      return { ...prevFilters, selectedCategories: updatedCategories };
    });
  };

  useEffect(() => {
    if (selectedCategories.length > 0 || selectedTime || minPrice || maxPrice) {
      applyFilters();
    } else {
      setFilteredExams(null);
    }
  }, [selectedCategories, selectedTime, minPrice, maxPrice]);

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
              {t("advanced_search")}
              {getActiveFilterCount() > 0 && (
                <span className="absolute top-1 right-2 transform translate-x-1/2 -translate-y-1/2 bg-brandBlue200 text-white text-sm rounded-full px-2 py-1">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>

          {getActiveFilterCount() > 0 ? (
            <div className="flex flex-wrap gap-2">
              {appliedFilters.selectedCategories &&
                appliedFilters.selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-3 bg-buttonPrimaryDefault text-white rounded-full px-4 py-3 font-gilroy font-normal text-lg leading-6"
                  >
                    {category}
                    <button
                      onClick={handleResetFilters}
                      className="ml-2 text-xl text-white hover:text-gray-300 focus:outline-none flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              {appliedFilters.selectedTime && (
                <div className="flex items-center gap-3 bg-buttonPrimaryDefault text-white rounded-full px-4 py-3 font-gilroy font-normal text-lg leading-6">
                  {appliedFilters.selectedTime}
                  <button
                    onClick={handleResetFilters}
                    className="ml-2 text-xl text-white hover:text-gray-300 focus:outline-none flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              )}
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
                    onClick={handleResetFilters}
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
              <div
                className="flex-1 font-gilroy overflow-hidden relative"
                ref={emblaRef}
              >
                <div className="flex font-gilroy gap-4">
                  {combinedList.map((category, index) => (
                    <div key={index} className="flex-none">
                      <button
                        className={`flex font-gilroy items-center gap-3 bg-grayLineFooter text-grayButtonText rounded-full px-4 py-3 font-normal text-lg leading-6 ${
                          selectedCategories.includes(category.name)
                            ? "bg-buttonPrimaryDefault text-white"
                            : ""
                        }`}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {showCategories && canScrollPrev && (
          <button
            className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 text-textSecondaryDefault z-10 bg-white rounded-full p-2 shadow-md"
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            aria-label="Scroll Left"
          >
            <GrFormPrevious className="fill-black text-black text-lg" />
          </button>
        )}

        {showCategories && canScrollNext && (
          <button
            className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 bg-white rounded-full p-2 shadow-md"
            onClick={() => emblaApi && emblaApi.scrollNext()}
            aria-label="Scroll Right"
          >
            <MdNavigateNext className="fill-black text-black text-lg" />
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="relative bg-white w-full max-w-md mx-auto p-12 rounded-2xl"
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <h2 className="font-gilroy text-center text-3xl font-medium text-buttonPrimaryDefault mb-10 leading-normal">
              {t("filter")}
            </h2>

            <div className="flex flex-col mb-6">
              <p className="mb-3 font-gilroy text-textSecondaryDefault font-medium text-xl leading-7">
                {t("price")}
              </p>

              <div className="flex gap-3">
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
                      if (/^\d*$/.test(value)) {
                        setMinPrice(value);
                      }
                    }}
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
                    className={`w-full border font-gilroy border-gray-300 rounded-md py-3 px-4 appearance-none hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus focus:outline-none ${
                      maxPrice ? "text-black" : "text-[#B2B2B2]"
                    }`}
                    value={maxPrice}
                    onChange={(e) => {
                      const value = e.target.value;
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

            <div className="mb-6">
              <p className="mb-3 font-gilroy text-textSecondaryDefault font-medium text-xl leading-7">
                {t("exam_duration")}
              </p>
              <div className="relative">
                <div
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-[#B2B2B2] cursor-pointer flex justify-between items-center time-dropdown-input hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus"
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                >
                  <span
                    className={
                      selectedTime
                        ? "text-black font-gilroy"
                        : "text-[#B2B2B2] font-gilroy"
                    }
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

                {isTimeDropdownOpen && (
                  <div className="absolute font-gilroy z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-scroll time-dropdown-menu">
                    {timeOptions.map((option, index) => (
                      <div
                        key={index}
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-black"
                        onClick={() => {
                          handleTimeSelection(option);
                          setIsTimeDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="mb-3 font-gilroy text-textSecondaryDefault font-medium text-xl leading-7">
                {t("category")}
              </p>
              <div className="relative">
                <div
                  className={`w-full border font-gilroy border-gray-300 rounded-md py-3 px-4 cursor-pointer flex flex-wrap items-center dropdown-input hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus ${
                    isCategoryDropdownOpen ? "bg-gray-100" : ""
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
                          <span className="font-gilroy text-base">
                            {category}
                          </span>
                          <button
                            className="ml-1 font-gilroy text-xl text-black hover:text-gray-700 focus:outline-none flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (item) => item !== category
                                )
                              );
                              handleResetFilters();
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
                      <span className="text-[#B2B2B2]">
                        {t("select_category")}
                      </span>
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

                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 z-20 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-[170px] overflow-y-auto shadow-lg">
                    {combinedList.map((category, index) => {
                      const isSelected = selectedCategories.includes(
                        category.name
                      );
                      return (
                        <div
                          key={index}
                          className={`py-2 px-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center ${
                            isSelected ? "bg-gray-100" : ""
                          }`}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (item) => item !== category.name
                                )
                              );
                            } else {
                              setSelectedCategories([
                                ...selectedCategories,
                                category.name,
                              ]);
                            }
                          }}
                        >
                          <span className="text-black">{category.name}</span>
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

            <div className="w-full flex font-gilroy flex-row justify-between mt-6">
              <button
                className="w-full ml-2 font-gilroy text-lg font-normal text-textSecondaryDefault flex flex-row items-center justify-center gap-2"
                onClick={handleResetFilters}
              >
                <RiLoopRightLine /> Filteri sıfırla
              </button>

              <button
                className="w-full ml-2 font-gilroy bg-buttonPrimaryDefault text-white py-3 rounded-md font-gilroy text-lg font-normal"
                onClick={() => {
                  setAppliedFilters({
                    minPrice,
                    maxPrice,
                    selectedTime,
                    selectedCategories,
                  });
                  setIsModalOpen(false);
                  applyFilters();
                }}
              >
                {t("search")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterCategories;
