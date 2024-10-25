import React, { useState } from "react";
import WarningQuestion from "../WarningQuestion";

function MultipleChoiceQuestion() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const options = [
    "Name box, Formula bar, Cell",
    "Ribbon, Quick Access Toolbar, Sheet Tabs",
    "Row, Column, Cell",
    "Worksheet, Workbook, Cell",
  ];

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-8 md:py-10 md:px-20 mt-8 w-full sm:w-[90%] md:w-[75%] bg-white shadow-Cardshadow flex flex-col justify-center mx-auto rounded-lg">
      <WarningQuestion />
      <h2 className="font-gilroy text-lg sm:text-xl md:text-2xl font-semibold leading-normal text-darkBlue400 mb-6 sm:mb-8">
        Aşağıdakı verilmiş cavablardan hansılar Exceldə pəncərəsə bölməsinə
        aiddir?
      </h2>

      <div className="flex flex-col gap-3 sm:gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center p-2 rounded-xl border font-gilroy transition-colors duration-200 cursor-pointer
              ${
                selectedOption === index
                  ? "bg-grayLineFooter border-inputDefault text-brandBlue900 font-medium"
                  : "border-buttonGhostPressed text-buttonPressedPrimary hover:bg-inputDefault"
              }`}
            onClick={() => handleOptionChange(index)}
          >
            <label className="flex items-center">
              <input
                type="radio"
                name="answer"
                className="hidden"
                checked={selectedOption === index}
                onChange={() => handleOptionChange(index)}
                readOnly
              />
              <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                {selectedOption === index && (
                  <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span>
                )}
              </span>
              <span className="ml-2 sm:ml-3 font-gilroy">
                {String.fromCharCode(65 + index)})
              </span>
            </label>
            <span className="ml-2">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoiceQuestion;
