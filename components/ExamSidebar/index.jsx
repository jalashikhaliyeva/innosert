import React from "react";

function ExamSidebar({
  questions,
  currentQuestion,
  handleQuestionClick,
  userAnswers,
}) {
  const totalAnswered = userAnswers.filter((answer) => answer !== null).length;

  const truncateTitle = (title) => {
    return title.length > 25 ? `${title.slice(0, 25)}...` : title;
  };

  return (
    <div className="w-full   sm:w-[290px]  pt-14 pb-56  p-6 font-gilroy overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Suallar</h2>
      <p className="text-gray-500 mb-4">
        Cavablanmış suallar: {totalAnswered}/{questions?.length}
      </p>
      <div className="space-y-2 overflow-y-auto">
        {questions?.map((question, index) => (
          <div
            key={question?.id}
            className={`flex items-start p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              index === currentQuestion
                ? "bg-blue-100"
                : userAnswers[index]
                ? "bg-[#EBF0FF]"
                : "bg-gray-100"
            }`}
            onClick={() => handleQuestionClick(index)}
          >
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                userAnswers[index] ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              {userAnswers[index] && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                >
                  <path
                    d="M1 5L4 8L11 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div
              className={`ml-3 flex-1 ${
                userAnswers[index] ? "text-blue-600" : "text-gray-700"
              }`}
              dangerouslySetInnerHTML={{
                __html: truncateTitle(question.title),
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamSidebar;
