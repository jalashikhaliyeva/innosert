import React from "react";
import WarningQuestion from "../WarningQuestion";

function MultipleChoiceQuestion({
  questionData,
  userAnswer,
  setUserAnswer,
  onSubmitReport,
}) {
  const handleOptionChange = (selectedOptionId) => {
    setUserAnswer(selectedOptionId);
  };

  return (
    <div className="py-6 px-4 sm:py-10 sm:px-8 lg:px-40 w-full sm:w-[90%] lg:w-[75%] mt-8 sm:mt-12 lg:mt-16 bg-white shadow-Cardshadow flex flex-col justify-center mx-auto rounded-lg">
      <WarningQuestion
        questionId={questionData.id}
        onSubmitReport={onSubmitReport}
      />

      <h2
        className="text-lg sm:text-xl font-gilroy font-semibold mb-6"
        dangerouslySetInnerHTML={{ __html: questionData.question }}
      ></h2>

      {/* Options */}
      <div className="flex flex-col gap-4">
        {questionData.answers.map((option) => {
          const isSelected = userAnswer === option.id;
          return (
            <div
              key={option.id}
              className={`flex items-center w-full md:w-[70%] lg:w-[50%] p-2 rounded-xl border ${
                isSelected
                  ? "border-gray-400 text-buttonPressedPrimary"
                  : "border-buttonGhostPressed text-buttonPressedPrimary"
              } font-gilroy`}
            >
              <label className="flex items-center w-full cursor-pointer">
                <input
                  type="radio"
                  name={`question-${questionData.id}`}
                  value={option.id}
                  checked={isSelected}
                  onChange={() => handleOptionChange(option.id)}
                  className="hidden"
                />
                <span className="flex items-center">
                  <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                    {isSelected && (
                      <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span>
                    )}
                  </span>
                  <span className="ml-3 font-gilroy">{option.label}</span>
                </span>
                <span
                  className="ml-2"
                  dangerouslySetInnerHTML={{ __html: option.answer }}
                ></span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MultipleChoiceQuestion;
