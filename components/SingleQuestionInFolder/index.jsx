import React from "react";

function SingleQuestionInFolder() {
  return (
    <div className="py-10 px-40 bg-white shadow-createBox flex flex-col justify-center rounded-lg">
      <h2 className="font-gilroy text-xl font-semibold leading-normal text-darkBlue400 mb-8">
        Aşağıdakı verilmiş cavablardan hansılar Exceldə pəncərəsə bölməsinə
        aiddir?
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center w-[50%] p-2 rounded-xl border border-green600 font-gilroy text-green600">
          <label className="flex items-center">
            <input
              type="radio"
              name="answer"
              className="hidden"
              checked
              readOnly
            />
            <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
              <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span>
            </span>
            <span className="ml-3 font-gilroy">A)</span>
          </label>
          <span className="ml-2">Name box, Formula bar, Cell</span>
        </div>
        <div className="flex items-center w-[50%] p-2 rounded-xl border border-buttonGhostPressed font-gilroy text-buttonPressedPrimary">
          <label className="flex items-center">
            <input
              type="radio"
              name="answer"
              className="hidden"
              checked
              readOnly
            />
            <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
              {/* <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span> */}
            </span>
            <span className="ml-3 font-gilroy">B)</span>
          </label>
          <span className="ml-2">Name box, Formula bar, Cell</span>
        </div>
        <div className="flex items-center w-[50%] p-2 rounded-xl border border-buttonGhostPressed font-gilroy text-buttonPressedPrimary">
          <label className="flex items-center">
            <input
              type="radio"
              name="answer"
              className="hidden"
              checked
              readOnly
            />
            <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
              {/* <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span> */}
            </span>
            <span className="ml-3 font-gilroy">C)</span>
          </label>
          <span className="ml-2">Name box, Formula bar, Cell</span>
        </div>
        <div className="flex items-center w-[50%] p-2 rounded-xl border border-buttonGhostPressed font-gilroy text-buttonPressedPrimary">
          <label className="flex items-center">
            <input
              type="radio"
              name="answer"
              className="hidden"
              checked
              readOnly
            />
            <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
              {/* <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span> */}
            </span>
            <span className="ml-3 font-gilroy">D)</span>
          </label>
          <span className="ml-2">Name box, Formula bar, Cell</span>
        </div>
      </div>
    </div>
  );
}

export default SingleQuestionInFolder;
