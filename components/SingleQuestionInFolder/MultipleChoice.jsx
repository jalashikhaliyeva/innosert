import React from "react";

function MultipleChoice({ selectedQuestion }) {
  console.log(selectedQuestion, "multiple");
  
  return (
    <div className="py-10 px-6 md:px-20 lg:px-40 bg-white shadow-createBox flex flex-col justify-center rounded-lg">
      <h2
        className="font-gilroy text-lg md:text-xl font-semibold leading-normal text-darkBlue400 mb-8"
        dangerouslySetInnerHTML={{ __html: selectedQuestion?.question }}
      ></h2>
      <div className="flex flex-col gap-4">
        {selectedQuestion?.answers?.map((answer, index) => (
          <div
            key={answer.id}
            className={`flex items-center w-full md:w-[70%] lg:w-[50%] p-2 rounded-xl border font-gilroy ${
              answer.right === 1
                ? "border-green600 text-green600"
                : "border-buttonGhostPressed text-buttonPressedPrimary"
            }`}
          >
            <label className="flex items-center">
              <input
                type="radio"
                name="answer"
                className="hidden"
                checked={answer.right === 1}
                readOnly
              />
              <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                {answer.right === 1 && (
                  <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span>
                )}
              </span>
              <span className="ml-3 font-gilroy">
                {String.fromCharCode(65 + index)})
              </span>
            </label>
            <span
              className="ml-2"
              dangerouslySetInnerHTML={{ __html: answer.answer }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoice;
