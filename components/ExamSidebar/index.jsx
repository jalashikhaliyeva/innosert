import React from "react";

function ExamSidebar() {
  // Mock data for questions
  const questions = [
    { id: 1, text: "Sual 1", answered: true },
    { id: 2, text: "Sual 1", answered: true },
    { id: 3, text: "Sual 1", answered: true },
    { id: 4, text: "Sual 1", answered: false },
    { id: 5, text: "Sual 1", answered: false },
    { id: 6, text: "Sual 1", answered: false },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-[290px]  mt-[90px] shadow-sm border -z-10  p-10 font-gilroy">
      <h2 className="text-xl font-semibold mb-2">Suallar</h2>
      <p className="text-gray-500 mb-4">Cavablanmış suallar: 4/20</p>
      <div className="space-y-2 overflow-y-auto h-[calc(100vh-160px)]">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`flex items-center p-2 rounded-lg ${
              question.answered ? "bg-[#EBF0FF]" : "bg-gray-100"
            }`}
          >
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center ${
                question.answered ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M8.06488 13.035L16.0999 5L17.1668 6.06687L8.06488 15.1688L3.83301 10.9381L4.89988 9.87125L8.06488 13.035Z"
                  fill="white"
                />
              </svg>
            </div>
            <span
              className={`ml-2 ${
                question.answered ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {question.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamSidebar;
