import React, { useState } from "react";
import WarningQuestion from "../WarningQuestion";

function CombinationQuestion() {
  // Sample data for questions and options
  const questions = [
    { id: 1, text: "1. Name box, Formula bar, Cell" },
    { id: 2, text: "2. Name box, Formula bar, Cell" },
    { id: 3, text: "3. Name box, Formula bar, Cell" },
  ];

  const options = ["A", "B", "C", "D"];

  // State to manage selected options
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill("")
  );

  // Handler for changing dropdown selection
  const handleSelectChange = (index, value) => {
    const newSelections = [...selectedOptions];
    newSelections[index] = value;
    setSelectedOptions(newSelections);
  };

  return (
    <div className="py-8 px-4 md:py-10 md:px-20 lg:px-40 mt-16 w-full md:w-[90%] lg:w-[75%] bg-white shadow-Cardshadow flex flex-col justify-center mx-auto rounded-lg">
      <WarningQuestion />
      <h2 className="text-lg md:text-xl font-gilroy font-semibold mb-4">
        1. Uyğunluğu müəyyən edin.
      </h2>
      <div className="flex flex-col lg:flex-row justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4 mb-8">
          {questions.map((question, index) => (
            <div key={question.id} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
              <span className="text-sm md:text-base font-gilroy">
                {question.text}
              </span>
              <select
                value={selectedOptions[index]}
                onChange={(e) => handleSelectChange(index, e.target.value)}
                className="border border-gray-300 font-gilroy rounded-md px-2 py-1 mt-1 md:mt-0 w-full md:w-auto"
              >
                <option className="font-gilroy" value="">
                  Seçin
                </option>
                {options.map((option) => (
                  <option className="font-gilroy" key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 w-full md:w-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="text-sm md:text-base font-gilroy border p-2 rounded-lg"
            >
              <span className="font-gilroy">
                {`${option}) Name box, Formula bar, Cell`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CombinationQuestion;
