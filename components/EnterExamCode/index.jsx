import React from "react";
import { FiLock } from "react-icons/fi";

function EnterExamCode() {
  return (
    <div className="w-[50%]   h-full flex justify-end">
      {/* Added h-screen and items-center to vertically center the content */}
      <div className="bg-[url('/img/CodeEnter.png')] bg-no-repeat bg-cover bg-center w-[400px] h-full px-8 py-14 rounded-xl flex flex-col items-center">
        {/* Removed justify-center since it's not needed with flex-col and items-center */}
        <h5 className="font-gilroy text-2xl font-medium leading-8 text-inputBgDefault pb-3 text-center w-auto">
          {/* Added text-center and w-auto */}
          Imatahan kodu daxil et
        </h5>
        <p className="font-gilroy text-lg text-inputBgDefault font-normal tracking-036 text-center w-auto">
          {/* Added text-center and w-auto */}
          Lorem ipsum dolor sit amet consectetur. Lorem consequat venenatis nunc
          convallis.
        </p>
        <div className="flex items-center justify-center gap-5 mt-8">
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-inputBorderHover" />

            <input
              type="text"
              placeholder="Kodu daxil et"
              className="w-full pl-10 pr-28 py-3 rounded-lg border border-gray-300 bg-inputBgDefault hover:bg-buttonSecondaryDefault hover:border-inputBorderHover text-gray-600 focus:outline-none"
            />

            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-buttonPrimaryDefault text-base text-white rounded-lg">
              Daxil ol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterExamCode;
