import React, { useState } from "react";

function EditQuestionDetails() {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");

  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    // Add more categories as needed
  ];

  const timeOptions = [
    "5 dəqiqə",
    "10 dəqiqə",
    "15 dəqiqə",
    // Add more time options as needed
  ];

  const levelOptions = [
    "Asan",
    "Orta",
    "Çətin",
    // Add more level options as needed
  ];

  return (
    <div className="flex flex-col bg-white justify-center p-10 rounded-lg mt-5 w-[75%] mx-auto ">
      <h1 className="font-gilroy text-textSecondaryDefault text-2xl font-medium leading-8">
        Detallar
      </h1>
      <div className="flex flex-row gap-6">
        {/* Categories Dropdown */}
        <div className="flex flex-col w-[45%]">
          <p className="font-gilroy text-inputDefaultLabel text-lg font-normal tracking-036 mb-2">
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
        {/* End of Categories Dropdown */}

        {/* Time Dropdown */}
        {/* <div className="flex flex-col w-[25%]">
          <p className="font-gilroy text-inputDefaultLabel text-lg font-normal tracking-036 mb-2">
            Suala ayrılan vaxt
          </p>
          <div className="relative">
          
            <div
              className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-[#B2B2B2] cursor-pointer flex justify-between items-center hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus"
              onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
            >
              <span
                className={
                  selectedTime
                    ? "text-black font-gilroy"
                    : "text-[#B2B2B2] font-gilroy"
                }
              >
                {selectedTime || "Vaxt seçin"}
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
              <div className="absolute font-gilroy z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
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
        </div> */}
        {/* End of Time Dropdown */}

        {/* Level Dropdown */}
        <div className="flex flex-col w-[50%]">
          <p className="font-gilroy text-inputDefaultLabel text-lg font-normal tracking-036 mb-2">
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
              <div className="absolute font-gilroy z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto ">
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
        {/* End of Level Dropdown */}
      </div>
    </div>
  );
}

export default EditQuestionDetails;
