import React, { useState, useEffect, useRef } from "react";
import WarningQuestion from "../WarningQuestion";

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

function CombinationQuestion({
  questionData,
  userAnswer,
  setUserAnswer,
  onSubmitReport,
}) {
  console.log(questionData, "questionData");
  // In CombinationQuestion component
  const keysWithIds = questionData.answers.key.map((key, idx) => ({
    id: idx,
    value: key,
  }));

  const answersWithIds = questionData.answers.value.map((value, idx) => ({
    id: idx,
    value: value,
  }));

  const [selectedPairs, setSelectedPairs] = useState(userAnswer || []);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});

  // Handle selection toggle
  const handleSelectionToggle = (questionIndex, answerId) => {
    const existingPair = selectedPairs.find(
      (pair) => pair.questionIndex === questionIndex
    );

    let updatedPair;
    if (existingPair) {
      const isSelected = existingPair.selectedOptionIds.includes(answerId);
      let selectedOptionIds;

      if (isSelected) {
        // Remove the answer
        selectedOptionIds = existingPair.selectedOptionIds.filter(
          (val) => val !== answerId
        );
      } else {
        // Add the answer
        selectedOptionIds = [...existingPair.selectedOptionIds, answerId];
      }

      if (selectedOptionIds.length === 0) {
        updatedPair = null; // No selections left
      } else {
        updatedPair = { questionIndex, selectedOptionIds };
      }
    } else {
      // No existing pair, add new selection
      updatedPair = { questionIndex, selectedOptionIds: [answerId] };
    }

    let updatedPairs;
    if (updatedPair) {
      updatedPairs = selectedPairs.filter(
        (pair) => pair.questionIndex !== questionIndex
      );
      updatedPairs.push(updatedPair);
    } else {
      // Remove the pair if no selections
      updatedPairs = selectedPairs.filter(
        (pair) => pair.questionIndex !== questionIndex
      );
    }

    setSelectedPairs(updatedPairs);
    setUserAnswer(updatedPairs);
  };

  // Toggle the visibility of the dropdown
  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = (event) => {
    Object.keys(dropdownRefs.current).forEach((key) => {
      if (
        dropdownRefs.current[key] &&
        !dropdownRefs.current[key].contains(event.target)
      ) {
        setOpenDropdowns((prev) => ({
          ...prev,
          [key]: false,
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

  return (
    <div className="py-6 px-4 min-h-[500px] mb-10 sm:py-10 sm:px-8 lg:px-32 w-full sm:w-[90%] lg:w-[85%] mt-8 sm:mt-12 lg:mt-16 bg-white shadow-Cardshadow flex flex-col justify-center mx-auto rounded-lg">
      <WarningQuestion
        questionId={questionData.id}
        onSubmitReport={onSubmitReport}
      />

      <h2
        className="text-lg sm:text-xl font-gilroy font-semibold mb-6"
        dangerouslySetInnerHTML={{ __html: questionData.question }}
      ></h2>

      <div className="flex flex-row">
        {/* Left Column: Numbered Questions with Toggle Divs */}
        <div className="flex flex-col space-y-6 font-gilroy w-1/2">
          {questionData.answers.key.map((keyItem, index) => {
            const existingPair = selectedPairs.find(
              (pair) => pair.questionIndex === index
            );
            const selectedOptionIds = existingPair
              ? existingPair.selectedOptionIds
              : [];

            return (
              <div
                key={index}
                className="flex flex-row space-x-4 relative"
                ref={(el) => (dropdownRefs.current[index] = el)} // Ref on parent container
              >
                <div className="flex-1 flex flex-col space-y-2">
                  <span className="font-gilroy font-normal text-lg">
                    {index + 1}.
                  </span>
                  <div
                    className="py-2 px-4 border rounded-lg font-gilroy text-grayButtonText text-lg w-full"
                    dangerouslySetInnerHTML={{
                      __html: keyItem || "No question provided",
                    }}
                  ></div>
                  {/* Toggle Div to Show/Hide Answers */}
                  <div
                    className="py-2 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full flex justify-between items-center"
                    onClick={() => toggleDropdown(index)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleDropdown(index);
                      }
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={openDropdowns[index] ? "true" : "false"}
                  >
                    {/* Display selected options or placeholder */}
                    <span>
                      {selectedOptionIds.length > 0
                        ? selectedOptionIds
                            .map(
                              (id) =>
                                questionData.answers.value.find(
                                  (answer) => answer.id === id
                                )?.value || ""
                            )
                            .join(", ")
                        : "Cavabları əlavə edin"}
                    </span>
                    {/* Dropdown Arrow Icon */}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openDropdowns[index] ? "transform rotate-180" : ""
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

                  {/* Custom Dropdown for Answers */}
                  {openDropdowns[index] && (
                    <div
                      className="absolute z-10 top-full left-0 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1"
                      onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
                    >
                      {questionData.answers.value.map((answer) => {
                        const isSelected = selectedOptionIds.includes(
                          answer.id
                        );
                        return (
                          <div
                            key={answer.id}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handleSelectionToggle(index, answer.id)
                            }
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleSelectionToggle(index, answer.id);
                              }
                            }}
                            role="option"
                            aria-selected={isSelected}
                          >
                            <span>{answer.value}</span>
                            {isSelected && <Checkmark />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Right Column: All Answers */}
        <div className="w-1/2 font-gilroy ml-4">
          <h3 className="font-normal mb-2 font-gilroy">Cavablar</h3>
          {questionData.answers.value.map((answer) => (
            <div
              key={answer.id}
              className="py-2 px-4 my-4 border rounded-lg hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full"
              dangerouslySetInnerHTML={{ __html: answer.value }} // Render HTML content
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CombinationQuestion;
