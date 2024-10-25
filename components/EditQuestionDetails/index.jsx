import React, { useState } from "react";

function EditQuestionDetails() {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");

  const categories = ["Category 1", "Category 2", "Category 3"];
  const timeOptions = ["5 dəqiqə", "10 dəqiqə", "15 dəqiqə"];
  const levelOptions = ["Asan", "Orta", "Çətin"];

  return (
    <div className="flex flex-col bg-white justify-center p-4 md:p-10 rounded-lg mt-5 w-full md:w-[75%] mx-auto">
      <h1 className="font-gilroy text-textSecondaryDefault text-xl md:text-2xl font-medium leading-8 mb-4">
        Detallar
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Categories Dropdown */}
        <div className="flex flex-col w-full md:w-[45%]">
          <p className="font-gilroy text-inputDefaultLabel text-base md:text-lg font-normal tracking-036 mb-2">
            Aid olduğu imtahan
          </p>
          <div className="mb-4">
            <div className="relative">
              {/* Custom Dropdown Input */}
              <div
                className={`w-full h-12 border font-gilroy border-gray-300 rounded-md px-4 cursor-pointer flex items-center overflow-x-auto hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus ${
                  isCategoryDropdownOpen ? "border-inputRingFocus" : ""
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
                        className="flex font-gilroy items-center bg-[#EBEBEB] text-black px-2 py-0 rounded-md mr-2"
                      >
                        <span className="font-gilroy text-sm md:text-base">
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
                    <span className="text-[#B2B2B2] text-base">
                      Kateqoriya seçin
                    </span>
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
                )}
              </div>

              {/* Dropdown Menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute font-gilroy z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
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
                        <span className="text-black font-gilroy">
                          {category}
                        </span>
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
        </div>

        {/* Level Dropdown */}
        <div className="flex flex-col w-full md:w-[50%]">
          <p className="font-gilroy text-inputDefaultLabel text-base md:text-lg font-normal tracking-036 mb-2">
            Çətinlik dərəcəsi
          </p>
          <div className="relative">
            {/* Custom Dropdown Input */}
            <div
              className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-[#B2B2B2] cursor-pointer flex justify-between items-center hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus"
              onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
            >
              <span
                className={
                  selectedLevel
                    ? "text-black font-gilroy"
                    : "text-[#B2B2B2] font-gilroy"
                }
              >
                {selectedLevel || "Çətinlik seçin"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isLevelDropdownOpen ? "transform rotate-180" : ""
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
            {isLevelDropdownOpen && (
              <div className="absolute font-gilroy z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                {levelOptions.map((levelOption, index) => (
                  <div
                    key={index}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => {
                      setSelectedLevel(levelOption);
                      setIsLevelDropdownOpen(false);
                    }}
                  >
                    {levelOption}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditQuestionDetails;
