import React from "react";

function Open({ selectedQuestion }) {
  // Remove HTML tags from question and answer texts for cleaner display
  const questionText = selectedQuestion.question.replace(/<[^>]+>/g, "");
  const answerText = selectedQuestion.answers.replace(/<[^>]+>/g, "");

  return (
    <div className="py-6 px-4 sm:py-10 sm:px-8 lg:px-60 w-full  mt-8 sm:mt-12 lg:mt-16 bg-white shadow-Cardshadow flex flex-col justify-center mx-auto rounded-lg">
      <h2 className="text-lg sm:text-xl font-gilroy font-semibold mb-2 sm:mb-4">
        {questionText}
      </h2>
      <textarea
        className="w-full h-24 sm:h-32 p-3 sm:p-4 font-gilroy bg-inputBgDefault hover:bg-inputBgHover border-arrowButtonGray border rounded-lg focus:outline-none focus:border-inputBorderHover resize-none"
        placeholder="Cavabınızı bura yazın..."
        defaultValue={answerText} // Display the answer if it’s pre-filled
      ></textarea>
    </div>
  );
}

export default Open;
