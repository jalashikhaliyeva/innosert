import React from "react";
import WarningQuestion from "../WarningQuestion";

function Combination({ selectedQuestion }) {
  // Group answers by their question key
  const groupedQuestions = selectedQuestion.answers.reduce((acc, answer) => {
    const key = answer?.key?.replace(/<[^>]+>/g, ""); // Remove any HTML tags from the question text
    if (!acc[key]) acc[key] = [];
    acc[key].push(answer?.value?.replace(/<[^>]+>/g, "")); // Add the answer value and remove HTML tags
    return acc;
  }, {});

  return (
    <div className="md:py-10 md:px-20 lg:px-60 mt-10 w-full  bg-white shadow-Cardshadow flex flex-col justify-center mx-auto rounded-lg">
     
      <h2 className="text-lg md:text-xl font-gilroy font-semibold mb-4">
        1. Uyğunluğu müəyyən edin.
      </h2>
      <div className="flex flex-col gap-6">
        {Object.entries(groupedQuestions).map(([questionText, answers], index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
              <span className="text-sm md:text-base font-gilroy">
                {index + 1}. {questionText}
              </span>
            </div>
            <div className="flex flex-col gap-2 pl-4">
              {answers.map((answer, idx) => (
                <span
                  key={idx}
                  className="text-sm md:text-base font-gilroy border p-1 rounded-md"
                >
                  {answer}
                </span>
              ))}
            </div>
            <hr className="my-4 border-t border-gray-300" /> {/* Line after each question-answer block */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Combination;
