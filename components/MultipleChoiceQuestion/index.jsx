import React from "react";
import { toast } from "react-toastify"; // Make sure to import toast
import WarningQuestion from "../WarningQuestion";
import { useTranslation } from "react-i18next";

function MultipleChoiceQuestion({
  questionData,
  userAnswer,
  setUserAnswer,
  onSubmitReport,
}) {
  // Ensure userAnswer is always an array
  const selectedAnswers = Array.isArray(userAnswer) ? userAnswer : [];
  const { t } = useTranslation();
  // Maximum allowed selections (provided by the question's "count" property)
  const maxSelections = questionData.count || 0;

  const handleOptionToggle = (optionId) => {
    // If only one selection is allowed, just update the selection:
    if (maxSelections === 1) {
      // If the clicked option is already selected, you might want to allow unselecting.
      // Uncomment the next lines if you want to toggle off on a re-click.
      //
      // if (selectedAnswers[0] === optionId) {
      //   setUserAnswer([]);
      //   return;
      // }
      // Otherwise, select the new answer.
      setUserAnswer([optionId]);
      return;
    }

    // For multiple selections:
    if (selectedAnswers.includes(optionId)) {
      // If option is already selected, remove it
      const updatedAnswers = selectedAnswers.filter((id) => id !== optionId);
      setUserAnswer(updatedAnswers);
    } else {
      // If the maximum selection count is reached, do not add a new selection
      if (selectedAnswers.length >= maxSelections) {
        toast.warning(t("toastMessages.maximumChoiceSelection"));
        return;
      }
      // Otherwise, add the option to the selected answers
      const updatedAnswers = [...selectedAnswers, optionId];
      setUserAnswer(updatedAnswers);
    }
  };

  return (
    <div className="py-6 px-4 mb-9 min-h-[500px] sm:py-10 sm:px-8 lg:px-40 w-full sm:w-[90%] lg:w-[75%] mt-8 sm:mt-12 lg:mt-16 bg-white shadow-Cardshadow flex flex-col mx-auto rounded-lg">
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
          const isSelected = selectedAnswers.includes(option.id);
          return (
            <div
              key={option.id}
              className={`flex items-center w-full md:w-[70%] lg:w-[50%] p-2 rounded-xl border ${
                isSelected
                  ? "border-gray-400 text-buttonPressedPrimary"
                  : "border-buttonGhostPressed text-buttonPressedPrimary"
              } font-gilroy`}
            >
              <label
                className="flex items-center w-full cursor-pointer"
                onClick={() => handleOptionToggle(option.id)}
              >
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
