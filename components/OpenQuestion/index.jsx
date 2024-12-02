import React from "react";
import WarningQuestion from "../WarningQuestion";

function OpenQuestion({
  questionData,
  userAnswer,
  setUserAnswer,
  onSubmitReport,
}) {
  return (
    <div className="py-6 px-4  min-h-[500px] sm:py-10 sm:px-8 lg:px-40 w-full sm:w-[90%] lg:w-[75%] mt-8 sm:mt-12 lg:mt-16 bg-white shadow-Cardshadow flex flex-col mx-auto rounded-lg">
      <WarningQuestion
        questionId={questionData.id}
        onSubmitReport={onSubmitReport}
      />
      <h2
        className="text-lg sm:text-xl font-gilroy font-semibold mb-2 sm:mb-4"
        dangerouslySetInnerHTML={{ __html: questionData.question }}
      ></h2>

      <textarea
        className="w-full font-gilroy h-24 sm:h-32 p-3 sm:p-4 bg-inputBgDefault hover:bg-inputBgHover border-arrowButtonGray border rounded-lg focus:outline-none focus:border-inputBorderHover resize-none"
        placeholder="Cavabınızı bura yazın..."
        value={userAnswer || ""}
        onChange={(e) => setUserAnswer(e.target.value)}
      ></textarea>
    </div>
  );
}

export default OpenQuestion;
