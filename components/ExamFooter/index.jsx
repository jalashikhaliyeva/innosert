import React from "react";

function ExamFooter({
  onNext,
  onPrevious,
  isLastQuestion,
  showPreviousButton,
}) {
  return (
    <div className="flex justify-end gap-4 p-4 bg-white shadow-md">
      {showPreviousButton && (
        <button
          onClick={onPrevious}
          disabled={onPrevious == null}
          className="bg-buttonSecondaryDefault text-grayButtonText text-lg py-2 px-4 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed  font-gilroy"
        >
          Əvvəlki suala keç
        </button>
      )}
      <button
        onClick={onNext}
        className="bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white font-normal text-lg py-2 px-4 rounded-lg flex gap-2 items-center"
      >
        {isLastQuestion ? "İmtahanı Bitir" : "Növbəti suala keç"}
      </button>
    </div>
  );
}

export default ExamFooter;
