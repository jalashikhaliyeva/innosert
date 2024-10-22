import React from "react";
import WarningQuestion from "../WarningQuestion";

function OpenQuestion() {
  return (
    <div className="py-10 px-40  w-[75%] mt-16 bg-white shadow-Cardshadow flex flex-col justify-center w-[75%] mx-auto rounded-lg">
      <WarningQuestion />

      <h2 className="text-xl font-gilroy font-semibold mb-4">
        1. Design system nədir?
      </h2>

      <textarea
        className="w-full h-32 p-4 bg-inputBgDefault hover:bg-inputBgHover border-arrowButtonGray border rounded-lg focus:outline-none focus:border-inputBorderHover resize-none"
        placeholder="Cavabınızı buraya yazın..."
      ></textarea>
    </div>
  );
}

export default OpenQuestion;
