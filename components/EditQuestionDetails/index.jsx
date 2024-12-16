import React, { useState } from "react";

function EditQuestionDetails({ level, setLevel, score, setScore }) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const categories = ["Category 1", "Category 2", "Category 3"];
  const levelOptions = ["Asan", "Orta", "Çətin"];

  // Handler to prevent certain keys
  const handleKeyDown = (e) => {
    // List of keys to prevent
    const forbiddenKeys = ["e", "E", "+", "-", "."];
    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Optionally, you can also validate the input value on change
  const handleChange = (e) => {
    const value = e.target.value;
    // Optional: You can add more validation logic here
    setScore(value);
  };

  return (
    <div className="flex flex-col bg-white justify-center p-4 md:p-10 rounded-lg mt-5 w-full md:w-[88%] mx-auto mb-4 ">
      <h1 className="font-gilroy text-textSecondaryDefault text-xl md:text-2xl font-medium leading-8 mb-4">
        Detallar
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
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
                  level ? "text-black font-gilroy" : "text-[#B2B2B2] font-gilroy"
                }
              >
                {level || "Çətinlik seçin"}
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
                      setLevel(levelOption);
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
        {/* Question Score Input */}
        <div className="flex flex-col w-full md:w-[50%]">
          <p className="font-gilroy text-inputDefaultLabel text-base md:text-lg font-normal tracking-036 mb-2">
            Sualın xalı
          </p>
          <input
            type="number"
            value={score}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Add the onKeyDown handler here
            min="0" // Prevents negative input
            className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-black font-gilroy focus:border-inputRingFocus focus:outline-none"
            placeholder="Xalı daxil edin"
          />
        </div>
      </div>
    </div>
  );
}

export default EditQuestionDetails;
