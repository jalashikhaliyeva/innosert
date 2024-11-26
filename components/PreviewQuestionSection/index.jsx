import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
// SVG for Checkmark
const Checkmark = () => (
  <svg
    className="w-5 h-5 text-blue-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// Strip HTML function using DOMPurify
const stripHtml = (html) => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
};

// Static Data for Combination Question
const staticCombinationData = {
  id: "combination1",
  question: "Exceldə pəncərəsə bölməsinə aid olan funksiyaları uyğunlaşdırın.",
  answers: {
    key: [
      { id: "k1", key: "A" },
      { id: "k2", key: "B" },
      { id: "k3", key: "C" },
      { id: "k4", key: "D" },
    ],
    value: [
      { id: "v1", value: "Name box" },
      { id: "v2", value: "Formula bar" },
      { id: "v3", value: "Ribbon" },
      { id: "v4", value: "Sazlama paneli" },
    ],
  },
};
function PreviewQuestionSection({ selectedOption }) {
  // State to manage selected answers for combination question
  const [combinationAnswers, setCombinationAnswers] = useState(
    staticCombinationData.answers.key.reduce((acc, keyItem) => {
      acc[keyItem.id] = ""; // Initialize with empty string for single selection
      return acc;
    }, {})
  );

  // State to manage which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Refs to handle click outside for each dropdown
  const dropdownRefs = useRef({});

  // Handle toggling of dropdown visibility
  const toggleDropdown = (keyId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = (event) => {
    Object.keys(dropdownRefs.current).forEach((keyId) => {
      if (
        dropdownRefs.current[keyId] &&
        !dropdownRefs.current[keyId].contains(event.target)
      ) {
        setOpenDropdowns((prev) => ({
          ...prev,
          [keyId]: false,
        }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle selection of an answer
  const handleSelectChange = (keyId, selectedValueId) => {
    setCombinationAnswers((prev) => ({
      ...prev,
      [keyId]: selectedValueId,
    }));
  };

  // Compute all selected value IDs to prevent duplicates (if needed)
  const selectedValueIds = Object.values(combinationAnswers).filter(
    (val) => val !== ""
  );

  return (
    <div className="py-10 px-6 md:px-20 lg:px-40 bg-white shadow-createBox flex flex-col justify-center w-full md:w-[85%] lg:w-[75%] mx-auto rounded-lg">
      {/* Render question title and conditionally render content based on selectedOption */}
      <h2 className="font-gilroy text-lg md:text-xl font-medium leading-normal text-darkBlue400 mb-8">
        Aşağıdakı verilmiş cavablardan hansılar Exceldə pəncərəsə bölməsinə
        aiddir?
      </h2>

      {selectedOption === "Variantli sual" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center w-full md:w-[70%] lg:w-[50%] p-2 rounded-xl border border-green600 font-gilroy text-green600">
            <label className="flex items-center">
              <input
                type="radio"
                name="answer"
                className="hidden"
                checked
                readOnly
              />
              <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span>
              </span>
              <span className="ml-3 font-gilroy">A)</span>
            </label>
            <span className="ml-2">Name box, Formula bar, Cell</span>
          </div>

          <div className="flex items-center w-full md:w-[70%] lg:w-[50%] p-2 rounded-xl border border-buttonGhostPressed font-gilroy text-buttonPressedPrimary">
            <label className="flex items-center">
              <input
                type="radio"
                name="answer"
                className="hidden"
                checked
                readOnly
              />
              <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                {/* Placeholder for radio check */}
              </span>
              <span className="ml-3 font-gilroy">B)</span>
            </label>
            <span className="ml-2">Palitra, Name box, Columns</span>
          </div>

          <div className="flex items-center w-full md:w-[70%] lg:w-[50%] p-2 rounded-xl border border-buttonGhostPressed font-gilroy text-buttonPressedPrimary">
            <label className="flex items-center">
              <input
                type="radio"
                name="answer"
                className="hidden"
                checked
                readOnly
              />
              <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                {/* Placeholder for radio check */}
              </span>
              <span className="ml-3 font-gilroy">C)</span>
            </label>
            <span className="ml-2">Cell, Accessories, Modul</span>
          </div>

          <div className="flex items-center w-full md:w-[70%] lg:w-[50%] p-2 rounded-xl border border-buttonGhostPressed font-gilroy text-buttonPressedPrimary">
            <label className="flex items-center">
              <input
                type="radio"
                name="answer"
                className="hidden"
                checked
                readOnly
              />
              <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                {/* Placeholder for radio check */}
              </span>
              <span className="ml-3 font-gilroy">D)</span>
            </label>
            <span className="ml-2">Ribbon, Sazlama paneli</span>
          </div>
        </div>
      )}

      {selectedOption === "Açıq sual" && (
        <div>
          {/* Render content for Açıq sual */}
          <p className="font-gilroy text-lg leading-normal text-darkBlue400 mb-8">
            Bu sualın cavabını yazın:
          </p>
          <textarea
            className="w-full h-32 p-4 border rounded-lg font-gilroy"
            placeholder="Cavabınızı bura yazın..."
            readOnly
          />
        </div>
      )}
      {selectedOption === "Kombinasiya sualı" && (
        <>
          <h2 className="text-lg sm:text-xl font-gilroy font-semibold mb-6">
            {staticCombinationData.question}
          </h2>

          <div className="flex flex-row">
            {/* Left Column: Numbered Questions with Custom Dropdowns */}
            <div className="flex flex-col space-y-6 font-gilroy w-1/2">
              {staticCombinationData.answers.key.map((keyItem, index) => (
                <div
                  key={keyItem.id}
                  className="flex flex-row space-x-4 relative"
                  ref={(el) => (dropdownRefs.current[keyItem.id] = el)}
                >
                  <div className="flex-1 flex flex-col space-y-2">
                    <span className="font-gilroy font-normal text-lg">
                      {index + 1}.
                    </span>
                    <div className="py-2 px-4 border rounded-lg font-gilroy text-grayButtonText text-lg w-full">
                      {keyItem.key}
                    </div>
                    {/* Custom Dropdown for Selecting Answers */}
                    <div
                      className="relative"
                      onClick={() => toggleDropdown(keyItem.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleDropdown(keyItem.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-haspopup="listbox"
                      aria-expanded={
                        openDropdowns[keyItem.id] ? "true" : "false"
                      }
                    >
                      <div className="py-2 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full flex justify-between items-center">
                        {/* Display selected option or placeholder */}
                        <span>
                          {combinationAnswers[keyItem.id]
                            ? stripHtml(
                                staticCombinationData.answers.value.find(
                                  (ans) =>
                                    ans.id === combinationAnswers[keyItem.id]
                                )?.value || ""
                              )
                            : "Cavabları əlavə edin"}
                        </span>
                        {/* Dropdown Arrow Icon */}
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            openDropdowns[keyItem.id]
                              ? "transform rotate-180"
                              : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>

                      {/* Dropdown Menu */}
                      {openDropdowns[keyItem.id] && (
                        <div className="absolute z-10 top-full left-0 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
                          {staticCombinationData.answers.value.map((answer) => {
                            const isSelected =
                              combinationAnswers[keyItem.id] === answer.id;
                            const isDisabled =
                              selectedValueIds.includes(answer.id) &&
                              combinationAnswers[keyItem.id] !== answer.id;
                            return (
                              <div
                                key={answer.id}
                                className={`flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                                  isDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                onClick={() => {
                                  if (!isDisabled) {
                                    handleSelectChange(keyItem.id, answer.id);
                                    toggleDropdown(keyItem.id);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    if (!isDisabled) {
                                      handleSelectChange(keyItem.id, answer.id);
                                      toggleDropdown(keyItem.id);
                                    }
                                  }
                                }}
                                role="option"
                                aria-selected={isSelected}
                                aria-disabled={isDisabled}
                              >
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: answer.value,
                                  }}
                                />
                                {isSelected && <Checkmark />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Column: All Answers */}
            <div className="w-1/2 font-gilroy ml-4">
              <h3 className="font-normal mb-2">Cavablar</h3>
              {staticCombinationData.answers.value.map((answer) => (
                <div
                  key={answer.id}
                  className="py-2 px-4 my-4 border rounded-lg font-gilroy text-grayButtonText text-lg w-full"
                >
                  {answer.value}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PreviewQuestionSection;
